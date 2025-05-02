
/*
    Challenge 1.
    Write a SQL query that counts the number of films in each category in the Pagila database.
    - The query should return two columns: category and film_count
    - category should display the name of each category
    - film_count should show the total number of films in that category
    - Results should be grouped by category name
 */
SELECT
    category.name AS category,
    COUNT(film_category.film_id) AS film_count
FROM 
    category
INNER JOIN 
    film_category ON category.category_id = film_category.category_id
GROUP BY
    category.category_id, category.name
ORDER BY
    film_count DESC;

-- your query here


 /*
    Challenge 2.
    Write a SQL query that finds the top 5 customers who have spent the most money in the Pagila database.
    - The query should return three columns: first_name, last_name, and total_spent
    - total_spent should show the sum of all payments made by that customer
    - Results should be ordered by total_spent in descending order
    - The query should limit results to only the top 5 highest-spending customers
 */

 -- your query here

SELECT 
    customer.first_name,
    customer.last_name,
    SUM(amount) AS total_spent
FROM
    customer
INNER JOIN
    payment ON customer.customer_id = payment.customer_id
GROUP BY
    customer.first_name, customer.last_name
ORDER BY
    total_spent DESC, customer.first_name ASC
LIMIT 5;

/*
    Challenge 3. 
    Note: MOVIES THAT HAVE BEEN RENTED
    Write a SQL query that lists all film titles that have not been rented in the past 10 years in the Pagila database.
    - The query should return one column: title
    - title should display the name of each film that hasn't been rented
    - The time period for "recent" should be within the last 10 years from the current date
    - Results should only include films that have no rental records in this time period
*/


-- your query here
SELECT 
    f.title,
	r.rental_date
FROM 
    film AS f
LEFT JOIN 
    inventory AS i ON f.film_id = i.film_id
LEFT JOIN 
    rental AS r ON i.inventory_id = r.inventory_id 
    AND r.rental_date >= '2014-01-01'
GROUP BY 
    f.title, r.rental_date
HAVING 
    COUNT(r.rental_id) > 0
ORDER BY 
    f.title;

/*
    Challenge 4.
    Write a SQL query that lists all films that have never been rented in the Pagila database.
    - The query should return two columns: title and inventory_id
    - title should display the name of each film that has never been rented
    - inventory_id should show the inventory ID of the specific copy
*/


-- your query here

SELECT 
    f.title,
    i.inventory_id
FROM 
    film AS f
LEFT JOIN 
    inventory AS  i ON f.film_id = i.film_id
LEFT JOIN 
    rental AS r ON i.inventory_id = r.inventory_id
WHERE 
    r.rental_id IS NULL
    AND i.inventory_id IS NOT NULL
ORDER BY 
    f.title;


/*
    Challenge 5.
    Write a SQL query that lists all films that were rented more times than the average rental count per film in the Pagila database.
    - The query should return two columns: title and rental_count
    - title should display the name of each film
    - rental_count should show the total number of times the film was rented
*/

SELECT 
    fr.title,
    fr.rental_count
FROM (
    SELECT
        f.title,
        COUNT(r.rental_id) AS rental_count,
        AVG(COUNT(r.rental_id)) OVER() AS avg_rental_count
    FROM 
        film AS f
    LEFT JOIN 
        inventory AS i ON f.film_id = i.film_id
    LEFT JOIN 
        rental AS r ON i.inventory_id = r.inventory_id
    GROUP BY
        f.film_id, f.title
) AS fr
WHERE 
    fr.rental_count > fr.avg_rental_count
ORDER BY
    fr.rental_count DESC;


-- your query here

/*
    Challenge 6.
    Write a SQL query that calculates rental activity for each customer.
    - The query should return the customer's first_name and last_name
    - It should also return their first rental date as first_rental
    - Their most recent rental date should be shown as last_rental
    - The difference in days between the first and last rentals should be shown as rental_span_days
    - Results should be grouped by customer and ordered by rental_span_days in descending order
*/

-- your query here
WITH customer_rentals AS (
    SELECT
        c.customer_id,
        c.first_name,
        c.last_name,
        r.rental_date
    FROM
        rental AS r
    INNER JOIN
        customer AS c ON r.customer_id = c.customer_id
)

SELECT
    first_name,
    last_name,
    MIN(rental_date) AS first_rental,
    MAX(rental_date) AS last_rental,
    (MAX(rental_date) - MIN(rental_date)) AS rental_span_days
FROM
    customer_rentals
GROUP BY
    customer_id, first_name, last_name
ORDER BY
    rental_span_days DESC;

/*
    Challenge 7.
    Find all customers who have not rented movies from every available genre.
    - The result should include the customer's first_name and last_name
    - Only include customers who are missing at least one genre in their rental history
*/


-- your query here
WITH all_genres AS (
    SELECT COUNT(DISTINCT category_id) AS total_genres
    FROM film_category
)

SELECT 
    c.first_name,
    c.last_name
FROM 
    customer c
WHERE 
    (SELECT COUNT(DISTINCT fc.category_id)
     FROM rental r
     JOIN inventory i ON r.inventory_id = i.inventory_id
     JOIN film_category fc ON i.film_id = fc.film_id
     WHERE r.customer_id = c.customer_id
    ) < (SELECT total_genres FROM all_genres)
ORDER BY 
    c.last_name, c.first_name;


/*
    Bonus Challenge 8 (opt)
    Find the Top 3 Most Frequently Rented Films in Each Category and Their Total Rental Revenue.
    - The result should include the film title, category name, rental count, and total revenue
    - Only the top 3 films per category should be returned
    - Results should be ordered by category and ranking within the category
*/


-- your query here



