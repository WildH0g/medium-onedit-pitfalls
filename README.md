# Three Pitfalls to Avoid When Using the onEdit Trigger in Google Apps Script

> The onEdit trigger can feel unreliable and messy, but when done right it is powerful and reliable.

The onEdit trigger is likely the most used trigger in Google Apps Script. It runs automatically with an event object whenever you change a value in a spreadsheet - programmatic changes excluded - thus allowing you to execute a script based on context. When done properly, it can be extremely powerful. When done wrong, however, it can feel unreliable and messy.
In this article, we will learn to avoid three common pitfalls:

- Not Exiting Early
- Making a Single Function Do Everything
- Expecting onEdit to Catch All Changes by Default

For this purpose, we will build a simple script to handle a task list in Google Sheets. It will do two things: add a checkbox next to new tasks and add a completion date when each task is checked as done.

[Read the full article](https://medium.com/@dmitry-kostyuk)
