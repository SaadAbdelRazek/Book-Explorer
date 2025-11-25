        // DOM Elements
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const resultsContainer = document.getElementById('resultsContainer');
        const loadingSpinner = document.getElementById('loadingSpinner');
        const noResultsMessage = document.getElementById('noResultsMessage');
        const suggestionsContainer = document.getElementById('suggestionsContainer');
        const bookModal = new bootstrap.Modal(document.getElementById('bookModal'));
        
        // Popular search terms
        const popularSearches = document.querySelectorAll('[data-search]');
        
        // Placeholder image for books without covers
        const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDIwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik03NSA3NUgxMjVWMTI1SDc1Vjc1WiIgZmlsbD0iI0RERERERCIvPgo8cGF0aCBkPSJNNzUgMTUwSDEyNVYyMDBINzVWMTUwWiIgZmlsbD0iI0RERERERCIvPgo8cGF0aCBkPSJNMTI1IDEwMEgxNzVWMTI1SDEyNVYxMDBaIiBmaWxsPSIjREREREREIi8+CjxwYXRoIGQ9Ik0xMjUgMTUwSDE3NVYyMDBIMTI1VjE1MFoiIGZpbGw9IiNEREREREQiLz4KPHJlY3QgeD0iNTAiIHk9IjUwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE1MCIgcng9IjUiIHN0cm9rZT0iI0NDQ0NDQyIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPgo=';
        
        // Event Listeners
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Add event listeners to popular search badges
        popularSearches.forEach(badge => {
            badge.addEventListener('click', (e) => {
                e.preventDefault();
                searchInput.value = badge.getAttribute('data-search');
                performSearch();
            });
        });
        
        // Search suggestions
        searchInput.addEventListener('input', () => {
            const term = searchInput.value.trim();
            if (term.length > 2) {
                showSuggestions(term);
            } else {
                suggestionsContainer.style.display = 'none';
            }
        });
        
        /**
         * Shows search suggestions based on input
         * @param {string} term - The search term
         */
        function showSuggestions(term) {
            // In a real app, you would fetch these from an API
            const suggestions = [
                `${term} fiction`,
                `${term} novels`,
                `${term} bestsellers`,
                `books about ${term}`,
                `${term} authors`
            ];
            
            suggestionsContainer.innerHTML = '';
            suggestions.forEach(suggestion => {
                const suggestionItem = document.createElement('div');
                suggestionItem.className = 'suggestion-item';
                suggestionItem.textContent = suggestion;
                suggestionItem.addEventListener('click', () => {
                    searchInput.value = suggestion;
                    suggestionsContainer.style.display = 'none';
                    performSearch();
                });
                suggestionsContainer.appendChild(suggestionItem);
            });
            
            suggestionsContainer.style.display = 'block';
        }
        
        /**
         * Performs the book search using the Google Books API
         */
        async function performSearch() {
            const searchTerm = searchInput.value.trim();
            
            if (!searchTerm) {
                alert('Please enter a search term');
                return;
            }
            
            // Hide suggestions
            suggestionsContainer.style.display = 'none';
            
            // Show loading spinner and clear previous results
            loadingSpinner.style.display = 'block';
            resultsContainer.innerHTML = '';
            noResultsMessage.classList.add('d-none');
            
            try {
                const books = await fetchBooks(searchTerm);
                renderBooks(books);
            } catch (error) {
                console.error('Error fetching books:', error);
                resultsContainer.innerHTML = `
                    <div class="col-12 text-center">
                        <div class="alert alert-danger">
                            <i class="fas fa-exclamation-triangle me-2"></i>
                            An error occurred while searching for books. Please try again.
                        </div>
                    </div>
                `;
            } finally {
                loadingSpinner.style.display = 'none';
            }
        }
        
        /**
         * Fetches books from the Google Books API
         * @param {string} searchTerm - The term to search for
         * @returns {Array} Array of book objects
         */
        async function fetchBooks(searchTerm) {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}&maxResults=20`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            
            const data = await response.json();
            return data.items || [];
        }
        
        /**
         * Renders the book cards in the results container
         * @param {Array} books - Array of book objects from the API
         */
        function renderBooks(books) {
            if (books.length === 0) {
                noResultsMessage.classList.remove('d-none');
                return;
            }
            
            const booksHTML = books.map((book, index) => {
                const volumeInfo = book.volumeInfo;
                
                // Handle missing thumbnail - using optional chaining and ternary operator
                const thumbnail = volumeInfo.imageLinks?.thumbnail || placeholderImage;
                
                // Handle missing author - using optional chaining and ternary operator
                const authors = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author';
                
                // Truncate title if too long
                const title = volumeInfo.title ? 
                    (volumeInfo.title.length > 50 ? volumeInfo.title.substring(0, 50) + '...' : volumeInfo.title) : 
                    'Unknown Title';
                
                // Add a small delay for staggered animation
                const animationDelay = `${index * 0.1}s`;
                
                return `
                    <div class="col-md-6 col-lg-4 col-xl-3">
                        <div class="book-card" style="animation-delay: ${animationDelay}">
                            <div class="book-cover">
                                <img src="${thumbnail}" alt="${title}">
                                ${volumeInfo.averageRating ? `<div class="book-badge"><i class="fas fa-star me-1"></i> ${volumeInfo.averageRating}</div>` : ''}
                            </div>
                            <div class="book-info">
                                <h3 class="book-title">${title}</h3>
                                <p class="book-author"><i class="fas fa-user-edit"></i> ${authors}</p>
                                <div class="book-actions">
                                    <button class="btn-details" onclick="showModal('${book.id}')">
                                        <i class="fas fa-eye"></i> Details
                                    </button>
                                    <button class="btn-favorite">
                                        <i class="far fa-bookmark"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            
            resultsContainer.innerHTML = booksHTML;
        }
        
        /**
         * Shows the modal with detailed book information
         * @param {string} bookId - The ID of the book to display
         */
        async function showModal(bookId) {
            try {
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch book details');
                }
                
                const book = await response.json();
                const volumeInfo = book.volumeInfo;
                
                // Set modal content
                document.getElementById('modalBookTitle').textContent = volumeInfo.title || 'Unknown Title';
                
                // Handle missing author - using optional chaining and ternary operator
                document.getElementById('modalBookAuthor').textContent = 
                    volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author';
                
                // Handle missing thumbnail - using optional chaining and ternary operator
                document.getElementById('modalBookCover').src = 
                    volumeInfo.imageLinks?.thumbnail || placeholderImage;
                
                // Handle missing page count
                document.getElementById('modalBookPages').textContent = 
                    volumeInfo.pageCount ? `${volumeInfo.pageCount} pages` : 'N/A';
                
                // Handle missing publisher
                document.getElementById('modalBookPublisher').textContent = 
                    volumeInfo.publisher || 'N/A';
                
                // Handle missing description
                document.getElementById('modalBookDescription').innerHTML = 
                    volumeInfo.description ? 
                        volumeInfo.description.replace(/\n/g, '<br>') : 
                        '<em>No description available.</em>';
                
                // Handle missing preview link
                const previewLink = document.getElementById('modalBookPreviewLink');
                if (volumeInfo.previewLink) {
                    previewLink.href = volumeInfo.previewLink;
                    previewLink.classList.remove('d-none');
                } else {
                    previewLink.classList.add('d-none');
                }
                
                // Show the modal
                bookModal.show();
                
            } catch (error) {
                console.error('Error fetching book details:', error);
                alert('Failed to load book details. Please try again.');
            }
        }
        
        // Initialize with a default search
        window.addEventListener('DOMContentLoaded', () => {
            searchInput.value = 'fantasy';
            performSearch();
        });