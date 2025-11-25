# 📚 Book Hunter - Book Search Engine

A responsive web application that allows users to search for books, view details, and find reading links using the **Google Books API**. 

## 🚀 Live Demo
[**Click here to view the Live Demo**](https://saadabdelrazek.github.io/Book-Explorer/) 

---

## 📝 Description

**Book Hunter** is a frontend project designed to demonstrate interaction with third-party APIs and dynamic DOM manipulation. 
The application allows users to search for any book by title or author. It handles raw JSON data from the Google Books API and renders it into a user-friendly, responsive interface using **Bootstrap 5**.

I chose this project to focus on building a clean, educational tool that encourages reading and knowledge sharing.

---

## ✨ Key Features

* **Real-time Search:** Fetches data asynchronously from Google Books API.
* **Dynamic Rendering:** Generates HTML cards for books using JavaScript.
* **Responsive Design:** Fully responsive layout using **Bootstrap Grid System**.
* **Detailed View:** Interactive **Modal** displaying book summary, page count, publisher, and publish date.
* **Defensive Programming:** Handles missing data gracefully (e.g., books with no cover images or missing author names) using placeholder assets to prevent UI breakage.
* **Direct Links:** Provides direct links to preview or read the book on Google Books.

---

## 🛠️ Technologies Used

* **HTML5** (Semantic Structure)
* **CSS3** (Custom Styling + Animations)
* **Bootstrap 5** (Layout, Cards, Modals, Buttons)
* **JavaScript (ES6+)**
    * `fetch` API & `async/await`
    * DOM Manipulation
    * Event Listeners
    * Array Methods (`map`, `forEach`)

---

## 🧠 What I Learned

Building this project helped me solidify my understanding of:

1.  **Asynchronous JavaScript:** Managing promises and using `try...catch` blocks to handle API errors and network states (Loading spinners).
2.  **Data Parsing:** Extracting nested data from complex JSON objects (`item.volumeInfo.imageLinks.thumbnail`).
3.  **Conditional Rendering:** Using JavaScript logic (Ternary operators / Optional Chaining `?.`) to handle incomplete API data.
4.  **UI/UX Best Practices:** Providing visual feedback during data fetching and ensuring the interface works on mobile devices.

---

## 💻 How to Run Locally

1.  Clone the repository:
    ```bash
    git clone (https://github.com/SaadAbdelRazek/Book-Explorer.git)
    ```
2.  Navigate to the project folder:
    ```bash
    cd Book-Explorer
    ```
3.  Open `index.html` in your browser.

---

