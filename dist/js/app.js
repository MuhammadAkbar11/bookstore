document.addEventListener('DOMContentLoaded', async function() {
	try {
		const books = await getBooks();
		loadBooks(books);
	} catch (err) {
		console.log(err);
	}
});

function getBooks(books) {
	return fetch('./newbooks.json')
		.then(res => {
			if (!res.ok) {
				throw res.statusText;
			}
			return res.json();
		})
		.then(res => {
			if (res.Response === 'False') {
				throw res.Error;
			}
			return res;
		});
}

function loadBooks(books) {
	let rows = '';
	books.forEach(b => (rows += showbooks(b)));
	const bookRows = document.querySelector('.books__row');
	bookRows.innerHTML = rows;
}

function showbooks(b) {
	return `
    <div class="col-sm-6 col-md-6 col-lg-3 mb-sm-3">
		<div class="card  position-relative p-0">
				<img src="${b.images}" class="card-img-top shadow rounded-top" alt="..." />
							<div class="card-body text-center">
								<h5 class="card-title text-dark">${b.title}</h5>
								<div class="card-text col-12 d-flex ">
									<div
										class="col-12 current__price  font-weight-bold text-center text-secondary"
									>
										Rp.${b.price}
									</div>
								</div>

								<div class="card-body__actions">
									<div class="icon__actions">
										<a class="actions__item" href="#"
											><i class="fas fa-cart-arrow-down"></i>
										</a>
										<a class="actions__item" href="#"
											><i class="fas fa-eye"></i
										></a>
									</div>
                                    <div class="actions__rating">
                                    ${b.rating}
                                    </div>
								</div>
							</div>
						</div>
					</div>
    
    `;
}

// fetch('dist/js/newbooks.json')
// 	.then(response => {
// 		return response.json();
// 	})
// 	.then(myJson => {
// 		console.log(myJson);
// 	});
