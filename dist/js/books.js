module.exports = { loadNewBooks };

function loadNewBooks() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'newbooks.json', true);

	xhr.onload = function() {
		if (this.status == 200) {
			const books = JSON.parse(this.responseText);

			let output = '';

			for (const i in books) {
				ouputt += `
                <div class="col-sm-6 col-md-6 col-lg-3 mb-sm-3">
                <div class="card">
                    <img src="${books[i].images}" class="card-img-top" alt="..." />
                    <div class="card-body text-center">
                        <h5 class="card-title text-dark">${books[i].title}</h5>
                        <div class="card-text col-12 d-flex ">
                                <div
                                    class="col-12 current__price  font-weight-bold text-center text-secondary"
                                >Rp.${books[i].price}</div>
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
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
			}
			return output;
			console.log(output);
		}
	};

	xhr.send();
}
