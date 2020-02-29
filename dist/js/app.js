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
		<div class="col-6 col-sm-6 col-md-6 col-lg-3 mb-sm-3">
			<div class="card card-book position-relative p-0">
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
					<div class="card-body__actions mt-md-3">
						<div class="icon__actions">
							<a class="actions__item" href="#"
								><small class="small">Add to cart</small> <i class="fas fa-plus fa-fw"></i>
							</a>
							<a
								href="#"
								class=" btn-detail-books actions__item"
								data-id="${id}"
								data-toggle="modal"
								data-target="#newBookModal "
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
	if (e.target.classList.contains('btn-detail-books')) {
		e.preventDefault();
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
					<div class="col-lg-5 p-0 pr-4 pl-3">
						<img src="${book.images}"  class="card-img shadow-sm ml-md-auto" />
					</div>
					<div class="col-lg-7 pl-md-5 poppins mt-5 text-left text-md-left modal-book-content">
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

document.querySelector('.btn-scrool__top').addEventListener('click', e => {
	e.preventDefault();
	window.scrollTo({
		top: 0,
		left: 100,
		behavior: 'smooth'
	});
});

// landing Element

function heroTitleAnimation() {
	[...document.querySelectorAll('.node-title')].map((i, s) => {
		setTimeout(() => {
			i.classList.add('landing');
		}, 300 * (s + 1));
	});

	setTimeout(() => {
		document.querySelector('.hero__subtitle').classList.add('landing');
	}, 1500);
}

const AddClassElement = function(element, newClass) {
	this.element = element;
	this.newClass = newClass;
	this.dataWait = 150;
	this.landing();
};

AddClassElement.prototype.landing = function() {
	if (this.element instanceof NodeList) {
		element = [...this.element];
		element.map((e, v) => {
			setTimeout(() => {
				e.classList.add(this.newClass);
			}, this.dataWait * (1 + v));
		});
	} else {
		this.dataWait = JSON.parse(this.element.getAttribute('data-wait'));
		setTimeout(() => {
			this.element.classList.add(this.newClass);
		}, this.dataWait);
	}
};

function landingElements() {
	navbar = document.querySelector('.navbar');
	heroTitle = document.querySelector('.hero__title');
	heroSubTitle = document.querySelector('.hero__subtitle');
	btnHero = document.querySelector('.btn-hero');
	new AddClassElement(navbar, 'navbar--landing');
	new AddClassElement(heroTitle, 'landing');
	new AddClassElement(heroSubTitle, 'landing');
	new AddClassElement(btnHero, 'btn--hero-landing');

	windowsScrollTop();
}

function windowsScrollTop() {
	window.addEventListener('scroll', function(e) {
		const navbar = this.document.querySelector('.navbar');
		const category = this.document.querySelector('.category');
		const newProducts = this.document.querySelector('.new__products');
		const testimonial = this.document.querySelector('.testim');
		const footer = this.document.querySelector('.footer');

		const winPos = window.pageYOffset;

		if (winPos >= document.querySelector('.about').offsetTop - 20) {
			navbar.classList.add('bg-dark');
			navbar.classList.remove('pt-lg-4');
			document.querySelector('.btn-scrool__top').classList.remove('hide');
		} else {
			navbar.classList.remove('bg-dark');
			navbar.classList.add('pt-lg-4');
			document.querySelector('.btn-scrool__top').classList.add('hide');
		}

		if (winPos >= 50) {
			const aboutContent = document.querySelector('.about__content');
			new AddClassElement(aboutContent, 'landing');
			new AddClassElement(
				document.querySelector('.about__logo'),
				'logo-landing'
			);
		}

		if (winPos >= category.offsetTop - 100) {
			new AddClassElement(
				document.querySelectorAll('.kategory__item'),
				'landing'
			);
		}

		if (winPos >= newProducts.offsetTop - 70) {
			new AddClassElement(
				this.document.querySelectorAll('.card-book'),
				'landing'
			);
		}
		if (winPos >= testimonial.offsetTop - 50) {
			new AddClassElement(
				this.document.querySelector('.carousel'),
				'carousel-landing'
			);
		}
		if (winPos >= footer.offsetTop - 200) {
			new AddClassElement(
				this.document.querySelectorAll('.footer__icon'),
				'landing'
			);
		}
	});

	const navbarToggler = document.querySelector('.navbar-toggler');

	// burger menu
	let menuOpen = false;
	navbarToggler.addEventListener('click', () => {
		if (!menuOpen) {
			navbarToggler.classList.add('open');
			menuOpen = true;
		} else {
			navbarToggler.classList.remove('open');
			menuOpen = false;
		}
	});
}

const navSearch = [...document.querySelectorAll('.nav__search')];
navSearch.map(nav => {
	nav.addEventListener('click', nav => {
		nav.preventDefault();
		new AddClassElement(document.querySelector('.modal__search'), 'show');
	});
});

document.querySelector('.modal__search-close').addEventListener('click', e => {
	e.preventDefault();
	document.querySelector('.modal__search').classList.remove('show');
});

document.addEventListener('DOMContentLoaded', landingElements);
