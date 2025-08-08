 let mockDB = [];
        let seeded = false;

        function showPage(page) {
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            
            if (page === 'demo') {
                document.getElementById('demo-page').classList.add('active');
                document.querySelectorAll('.nav-btn')[0].classList.add('active');
            } else {
                document.getElementById('code-page').classList.add('active');
                document.querySelectorAll('.nav-btn')[1].classList.add('active');
            }
        }

        async function seedDB() {
            try {
                const show = await fetch('https://api.tvmaze.com/singlesearch/shows?q=friends');
                const showData = await show.json();
                const eps = await fetch(`https://api.tvmaze.com/shows/${showData.id}/episodes`);
                const epsData = await eps.json();
                
                mockDB = epsData.map(ep => ({
                    id: ep.id, name: ep.name, season: ep.season,
                    number: ep.number, airdate: ep.airdate,
                    summary: ep.summary?.replace(/<[^>]*>/g, '') || 'No summary'
                }));
                
                seeded = true;
                showResponse('seed', { success: true, total: mockDB.length, sample: mockDB[0] });
            } catch (error) {
                showResponse('seed', { success: false, error: error.message });
            }
        }

        function demo(type) {
            if (!seeded && type !== 'create') {
                showResponse(type, { success: false, error: 'Please seed database first' });
                return;
            }

            const responses = {
                create: { success: true, data: { id: 99999, name: "New Episode", season: 11, number: 1, airdate: "2024-01-01", summary: "Created via API" }},
                getall: { success: true, count: 5, data: mockDB.slice(0, 5) },
                getone: { success: true, data: mockDB[0] || { id: 40646, name: "The One Where Monica Gets a Roommate", season: 1, number: 1, airdate: "1994-09-22", summary: "Monica's old friend Rachel moves in..." }},
                update: { success: true, data: { id: 40646, name: "Updated Episode", season: 1, number: 1, airdate: "1994-09-22", summary: "Updated summary" }},
                delete: { success: true, message: "Episode deleted" },
                search: { success: true, count: 2, query: "roommate", data: mockDB.filter(ep => ep.name.toLowerCase().includes('roommate')).slice(0, 2) }
            };

            showResponse(type, responses[type]);
        }

        function showResponse(type, data) {
            const div = document.getElementById(`${type}-response`);
            div.style.display = 'block';
            div.textContent = JSON.stringify(data, null, 2);
        }