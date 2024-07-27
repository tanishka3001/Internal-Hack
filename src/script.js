document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '966ab9821b784e31873f2a4321e112de'; // Replace with your NewsAPI key
    const newsContainer = document.getElementById('news-container');

    fetch(`https://newsapi.org/v2/top-headlines?category=business&country=in&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const articles = data.articles;
            if (articles.length > 0) {
                articles.forEach(article => {
                    const articleElement = document.createElement('div');
                    articleElement.classList.add(
                        'bg-white',
                        'p-4',
                        'rounded-lg',
                        'shadow-lg',
                        'transition',
                        'transform',
                        'hover:scale-105',
                        'duration-300',
                        'flex',
                        'flex-col',
                        'justify-between',
                        'text-gray-900'
                    );
                    
                    const title = document.createElement('h2');
                    title.classList.add('text-xl', 'font-semibold', 'mb-2');
                    title.textContent = article.title;

                    const description = document.createElement('p');
                    description.classList.add('text-gray-700', 'text-base', 'mb-2');
                    description.textContent = article.description || 'No description available';

                    const link = document.createElement('a');
                    link.classList.add('text-blue-500', 'hover:underline');
                    link.href = article.url;
                    link.target = '_blank';
                    link.textContent = 'Read more';

                    articleElement.appendChild(title);
                    articleElement.appendChild(description);
                    articleElement.appendChild(link);

                    newsContainer.appendChild(articleElement);
                });
            } else {
                newsContainer.innerHTML = '<p class="text-center text-gray-600">No financial news available at the moment.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            newsContainer.innerHTML = '<p class="text-center text-gray-600">Error fetching news. Please try again later.</p>';
        });
});
