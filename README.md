# Overview

This is going to be a web application for a cleaning company. Where customers can access, get quotes, and book services.

For now, this is a prototype only with some administration functionality, such as, generating, viewing details, updating and deleting a quote.

[Software Demo Video](https://youtu.be/tVtGEQ00rDo)

# Web Pages

Home Page (This page hasn't been created yet, this will be the future landing page for new customers).

Admin Pages ("/admin/") - This is where the administration functionality is going to be.
- So far, I have added the functionality to manage quotes. By clicking the links on the nav bar in the admin route, employers would be able to view and generate new quotes.

Quotes page ("/admin/quotes/")
- On the quotes table, employers can access the details of a quote, update it, or delete it.

Generate Quote Page ("/admin/quotes/generate/") 
- Page containing the form to get a new quote.

View Quote Details Page ("/admin/[id]/view") 
- Page showing the details of the quote generated.

Edit Quote Page ("/admin/[id]/edit") 
- Page containing the form to update an existing quote.


# Development Environment
- Next.js Version 15.3.0
- React Version 19
- Zod Version 3.24.2
- Postgres Version 3.4.5

# Useful Websites

* [React Foundations](https://nextjs.org/learn/react-foundations)
* [NextJs App Router Tutorial](https://nextjs.org/learn/dashboard-app)

# Future Work

* Generate a landing page for new customers.
* Add functionality to email quotes to customers / For customers to request to contact the company with that quote information.
* Add authentication and authorization for new customers to get quotes, and for employers to manage them.