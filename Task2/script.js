const mockResponses = {
    show:{
        status: 200,
        data:{
        id: 431,
        name: "Friends",
        status: "Ended",
        premiered: "1994-09-22",
        ended: "2004-05-06",
        runtime: 22,
        genres: ["Comedy", "Romance"],
        summary: "Six friends navigate life and love in New York City, with Central Perk as their second home.",
        network: "NBC",
        gunther_notes: "Best coffee shop in NYC. Rachel worked here. I know everything.",
        total_episodes: 236,
        seasons: 10
            }
    },
    characters:{
        status: 200,
        data:[
        {
            name: "Rachel Green",
            actor: "Jennifer Aniston",
            gunther_secret: "Had the biggest crush on her. She made terrible coffee.",
            relationship_status: "It's complicated with Ross",
            favorite_order: "Decaf cappuccino, extra foam"
        },
        {
            name: "Ross Geller",
            actor: "David Schwimmer",
            gunther_secret: "Paleontology nerd. Says 'We were on a break' too much.",
            relationship_status: "It's complicated with Rachel",
            favorite_order: "Regular coffee, black"
        },
        {
            name: "Monica Geller",
            actor: "Courteney Cox",
            gunther_secret: "Obsessively clean. Great tipper.",
            relationship_status: "Married to Chandler",
            favorite_order: "Skinny vanilla latte"
        }
        ]
    },
    episodes:{
        status: 200,
        data:{
        total_episodes: 236,
        seasons: 10,
        sample_episodes:[
        {
            title: "The One with the Embryos",
            season: 4,
            episode: 12,
            gunther_rating: "Classic! The apartment bet episode."
        },
        {
            title: "The One Where Everyone Finds Out",
            season: 5,
            episode: 14,
            gunther_rating: "Monica and Chandler's secret revealed!"
        }
        ]
        }
    },
    secrets:{
        status: 200,
        data:{
            gunther_exclusive_intel: [
                "Rachel never actually learned how to make coffee properly",
                "Ross practiced his 'We were on a break' speech in the mirror",
                "Monica reorganized our supply closet without asking (but it was better)",
                "Phoebe's 'Smelly Cat' was inspired by a real customer's pet",
                "Chandler always left the biggest tips when he was nervous"
            ],
            behind_the_scenes: "I've been watching them for 10 years. I know everything.",
            confidence_level: "Gunther-certified accurate"
        }
    },
    gossip:{
        status: 201,
        data:{
            message: "Gossip successfully added to Gunther's mental database",
            timestamp: new Date().toISOString(),
            status: "Filed under 'Things I Pretend Not to Notice'"
            }
    },
    quotes:{
        status: 200,
        data:{
            random_quote: "Smelly Cat, Smelly Cat, what are they feeding you?",
            character: "Phoebe Buffay",
            episode: "Multiple episodes",
            gunther_commentary: "She performed this at Central Perk many times. Customers had mixed reactions.",
            other_favorites:[
                "We were on a break! - Ross",
                "Could I BE any more sarcastic? - Chandler",
                "I'm not great at the advice. Can I interest you in a sarcastic comment? - Chandler"
            ]
        }
    }
};
function tryRoute(route){
    const responseArea = document.getElementById(`response-${route}`);
    const response = mockResponses[route];
            
        responseArea.style.display = 'block';
        responseArea.innerHTML = `
        <div class="status-code status-${response.status}">
            HTTP ${response.status} ${response.status === 200 ? 'OK' : response.status === 201 ? 'Created' : 'Error'}
        </div>
        <div class="json-response">${JSON.stringify(response.data, null, 2)}</div>
         `;
        }

        async function fetchRealData() {
            const loadingDiv = document.getElementById('loading');
            const responseDiv = document.getElementById('real-api-response');
            
            loadingDiv.style.display = 'block';
            responseDiv.style.display = 'none';
            
            try {
                const response = await fetch('https://api.tvmaze.com/singlesearch/shows?q=friends');
                const data = await response.json();
                
                
                const guntherResponse = {
                    gunther_says: "Here's what I found in my files about our favorite show!",
                    tvmaze_data: {
                        name: data.name,
                        premiered: data.premiered,
                        ended: data.ended,
                        genres: data.genres,
                        summary: data.summary?.replace(/<[^>]*>/g, ''), // Remove HTML tags
                        network: data.network?.name,
                        rating: data.rating?.average,
                        runtime: data.runtime,
                        status: data.status
                    },
                    gunther_notes: "This is the real deal from TVMaze API - the show that made Central Perk famous!",
                    api_status: "Successfully fetched",
                    timestamp: new Date().toISOString()
                };
                
                loadingDiv.style.display = 'none';
                responseDiv.style.display = 'block';
                responseDiv.innerHTML = `
                    <div class="status-code status-200">
                        HTTP 200 OK - Real TVMaze API Response
                    </div>
                    <div class="json-response">${JSON.stringify(guntherResponse, null, 2)}</div>
                `;
                
            } catch (error) {
                loadingDiv.style.display = 'none';
                responseDiv.style.display = 'block';
                responseDiv.innerHTML = `
                    <div class="status-code status-500">
                        HTTP 500 Internal Server Error
                    </div>
                    <div class="json-response">{
  "error": "Failed to fetch data from TVMaze API",
  "gunther_says": "Sorry, even I can't reach the TVMaze servers right now!",
  "details": "${error.message}",
  "suggestion": "Try again later - maybe the API is taking a coffee break?"
}</div>
                `;
            }
        }