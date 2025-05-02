/*
    Challenge: Implement a Secure Fund Transfer Function

    In this challenge, you will implement a PostgreSQL stored function to simulate transferring funds 
    between two accounts in a banking system. The function must follow proper validation, ensure data 
    integrity, and log transactions with a shared reference.

    Your function should be named:
    banking.transfer_funds(from_id INT, to_id INT, amount NUMERIC)

    The function must:

    - Prevent transfers to the same account
    - Ensure the transfer amount is greater than zero
    - Validate that both sender and recipient accounts exist
    - Prevent transfers if either account is marked as "frozen"
    - Ensure the sender has sufficient funds
    - Debit the sender and credit the recipient atomically
    - Log two transactions: a withdrawal and a deposit, both linked by the same UUID reference
    - Raise meaningful exceptions for all validation failures

    The function should perform all operations within a safe transactional context, maintaining 
    database consistency even in the event of failure.

    Notes:
    - In order to test you can mock some additional data in the tables that participates in this challenge.
    - Make sure of raising errors when they're present

    ERD:
    +---------------------+            +--------------------------+
    |     accounts        |            |      transactions        |
    +---------------------+            +--------------------------+
    | account_id (PK)     |<-----------| transaction_id (PK)      |
    | balance             |            | account_id (FK)          |
    | status              |            | amount                   |
    +---------------------+            | transaction_type         |
                                       | reference                |
                                       | transaction_date         |
                                       +--------------------------+
*/


-- your solution here

CREATE OR REPLACE FUNCTION banking.transfer_funds(from_id INT, to_id INT, amount NUMERIC)
RETURNS VOID AS $$
DECLARE
    from_balance NUMERIC;
    from_status TEXT;
    to_status TEXT;
    reference TEXT := 'transfer_' || NOW();
BEGIN
    IF from_id = to_id THEN
        RAISE EXCEPTION 'Cannot transfer to the same account';
    END IF;

    IF amount <= 0 THEN
        RAISE EXCEPTION 'Transfer amount must be greater than zero';
    END IF;

    SELECT balance, status INTO from_balance, from_status
    FROM banking.accounts
    WHERE account_id = from_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Sender account does not exist';
    END IF;

    SELECT status INTO to_status
    FROM banking.accounts
    WHERE account_id = to_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Recipient account does not exist';
    END IF;

    IF from_status = 'frozen' THEN
        RAISE EXCEPTION 'Sender account is frozen';
    END IF;

    IF to_status = 'frozen' THEN
        RAISE EXCEPTION 'Recipient account is frozen';
    END IF;

    IF from_balance < amount THEN
        RAISE EXCEPTION 'Insufficient funds in sender account';
    END IF;

    UPDATE banking.accounts
    SET balance = balance - amount
    WHERE account_id = from_id;

    UPDATE banking.accounts
    SET balance = balance + amount
    WHERE account_id = to_id;

    INSERT INTO banking.transactions(account_id, amount, transaction_type, reference, transaction_date)
    VALUES (from_id, amount, 'withdrawal', reference, NOW());

    INSERT INTO banking.transactions(account_id, amount, transaction_type, reference, transaction_date)
    VALUES (to_id, amount, 'deposit', reference, NOW());
END;
$$ LANGUAGE plpgsql;

-- Test cases:

-- Before testing, please insert the following account: 
INSERT INTO banking.accounts(account_id, balance, status) VALUES
(4, 0.00, 'active');

-- Case: Valid transfer
SELECT banking.transfer_funds(1, 2, 100.00);

-- Case: Same account ID
SELECT banking.transfer_funds(1, 1, 50.00);

-- Case: Amount = 0
SELECT banking.transfer_funds(1, 2, 0);

-- Case: Negative Amount
SELECT banking.transfer_funds(1, 2, -10);

-- Case: Sender account not exists
SELECT banking.transfer_funds(999, 2, 50);

-- Case: Recipient account not exists
SELECT banking.transfer_funds(1, 999, 50);

-- Case: Sender account is frozen
SELECT banking.transfer_funds(3, 2, 50);

-- Case: Recipient account is frozen
SELECT banking.transfer_funds(1, 3, 50);

-- Case: Not enough funds
SELECT banking.transfer_funds(4, 1, 10);