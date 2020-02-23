document.addEventListener('DOMContentLoaded', async function() {
	try {
		const books = await getBooks();
		loadBooks(books);
	} catch (err) {
		console.log(err);
	}
});

function getBooks() {
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

function showbooks({ images, title, price, id, rating }) {
	return `
		<div class="col-sm-6 col-md-6 col-lg-3 mb-sm-3">
			<div class="card  position-relative p-0">
				<img src="${images}" class="card-img-top shadow rounded-top" />
				<div class="card-body text-center">
					<h5 class="card-title text-dark">${title}</h5>
					<div class="card-text col-12 d-flex ">
						<div
							class="col-12 current__price  font-weight-bold text-center text-secondary"
						>
							Rp.${price}
						</div>
					</div>
					<div class="card-body__actions">
						<div class="icon__actions">
							<a class="actions__item " href="#"
								><small class="small">Add to cart</small> <i class="fas fa-plus fa-fw"></i>
							</a>
							<a
								href="#"
								class=" btn-detail-books actions__item"
								data-id="${id}"
								data-toggle="modal"
								data-target="#newBookModal"
							>
							<small class="small">Detail</small> 
						
							</a>
						</div>
						<div class="actions__rating">
							${rating}
						</div>
					</div>
				</div>
			</div>
		</div>
	`;
}

document.addEventListener('click', async function(e) {
	e.preventDefault();
	if (e.target.classList.contains('btn-detail-books')) {
		try {
			const id = e.target.dataset.id;
			const books = await getBooks();
			detailBooks(books, id);
		} catch (err) {
			console.log(err);
		}
	}
});

function detailBooks(books, id) {
	books.filter(book => {
		if (book.id == id) {
			const bookdetail = showBookDetails(book);
			const modalDetail = document.querySelector('.modal-body');
			modalDetail.innerHTML = bookdetail;
		}
		return false;
	});
}

function showBookDetails(book) {
	return `
		<div class="container py-5">
			<div class="card main-modal-book border-0">
				<div class="row p-0">
					<div class="col-md-5 p-0 pr-4 pl-3">
						<img src="${book.images}"  class="card-img shadow-lg" />
					</div>
					<div class="col-md-7 pl-md-5 poppins mt-5 mt-md-0 text-left text-md-left modal-book-content">
						<h4 class="font-weight-bold mt-3">${book.title}</h4>
						<div class="actions__rating mt-2 mt-lg-3 text-theme">
							${book.rating}
						</div>
						<h5 class="text-theme mt-2 mt-lg-3 " >Rp. ${book.price}</h5>
						<h6 class="mt-2 mt-lg-3"> 
						<span class="font-weight-bold book-writer text-left" >Writer : </span> ${book.writter}</h6>
						<h6 class="mt-2 mt-lg-3"> 
						<span class=" font-weight-bold book-writer" >Year : </span> ${book.year}</h6>
						<h6 class="mt-2 mt-lg-3"> 
						<span class=" font-weight-bold book-writer" >Publisher : </span> ${book.publisher}</h6>
						<p class="book-detail mt-2" >
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, aut reiciendis. Architecto pariatur eveniet odit officia ad neque libero saepe.
						</p>
						
						<a href="#" class="btn btn-theme rounded-0">Add to Cart</a>

						<div class="row mt-5">
							<h6 class="col text-uppercase text-dark">share this product</h6>
							<div class="col ">
								<div class="row text-theme my-auto">
									<a class="text-theme ml-3" href=""><i class="fab fa-instagram fa-2x" ></i></a>
									<a class="text-theme ml-3" href=""><i class="fab fa-pinterest-p fa-2x" ></i></a>
									<a class="text-theme ml-3" href=""><i class="fab fa-twitter fa-2x" ></i></a>
									<a class="text-theme ml-3" href=""><i class="fab fa-facebook-f fa-2x" ></i></a>
								</div>
							</div>
						</div>								
					</div>
				</div>
			</div>
		</div>
	`;
}

window.addEventListener('scroll', function(e) {
	const navbar = this.document.querySelector('.navbar');

	const winPos = window.pageYOffset;

	//if (winPos >= 100) {
	// 	navbar.style.cssText = `top: -300px`
	// }

	if (winPos >= document.querySelector('.about').offsetTop - 20) {
		navbar.classList.add('bg-dark');
		navbar.classList.remove('pt-lg-4');
	} else {
		navbar.classList.remove('bg-dark');
		navbar.classList.add('pt-lg-4');
	}
});
