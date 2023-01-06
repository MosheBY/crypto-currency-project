$(() => {
	
	



	$(document).on('click', '.moreInfoBtn', (event) => {
		let current = $(event.currentTarget);
		let coinId = $(event.currentTarget).data('id');
		console.log(current.siblings('.coinInfo'));
		if (current.siblings('.coinInfo').length) {
			current.siblings('.coinInfo').remove();
			return;
		}
		$.ajax({
			url: `https://api.coingecko.com/api/v3/coins/${coinId}`,
			type: 'GET',
			success: function (data) {
				$(event.currentTarget).parent()
					.append(`<div class="coinInfo">            
				    <img src="${data.image.thumb}">				
				    <p>USD: ${data.market_data.current_price.usd}</p>
				    <p>EUR: ${data.market_data.current_price.eur}</p>
				    <p>ILS: ${data.market_data.current_price.ils}</p>
				</div>`);
			},
			error: function (data) {
				alert(`Error:${data}`);
			},
		});
	});

	function displayCards(card) {
		if (!card) {
			return;
		}
		$('.coinCard').append(`<div class="card" style="width: 18rem;">
                                    <div class="card-body cardBody">
                                        <h5 id="${card.symbol.toUpperCase()}a1" class="card-title">${card.symbol.toUpperCase()}</h5>
                                        <p class="card-text">${card.name}</p>
                                        <div class="form-check form-switch">
                                            <label class="form-check-label" for="flexSwitchCheckDefault"></label>
                                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                                        </div><button type="button" data-id="${card.id}" class="moreInfoBtn btn btn-primary btn-sm ">More Info</button>
                                    </div>
                                </div> `);
	}

	function cryptoApi() {
		$.ajax({
			url: 'https://api.coingecko.com/api/v3/coins/',
			type: 'GET',
			success: function (data) {
				for (let i = 0; i <= 100; i++) {
					displayCards(data[i]);
				}
			},
			error: function (data) {
				alert(`Error:${data}`);
			},
		});
	}

	cryptoApi();
});