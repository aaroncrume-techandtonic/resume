
<script>
        // Data Store
        const careerData = [
            {
                id: 1,
                role: "Bartender / Service Lead",
                company: "The Harbor View Grotto",
                location: "Crescent City, CA",
                years: "2011 – Present",
                color: "border-black",
                summary: "Decade-long tenure in fine casual seafood & steak dining.",
                details: [
                    "Managed service bar for entire dining room while maintaining high-touch guest interaction.",
                    "Demonstrated extreme reliability and consistency over 12+ years.",
                    "Maintained high sanitation standards and inventory controls."
                ]
            },
            {
                id: 2,
                role: "Bartender (6 Year Tenure)",
                company: "Premier Regional Casino", 
                location: "Smith River, CA",
                years: "Casino Experience",
                color: "border-red-600",
                summary: "Extensive background in high-volume gaming and hospitality environments.",
                details: [
                    "Mastered the specific pace and compliance requirements of a 24/7 casino floor.",
                    "Handled high-volume transactions and strict alcohol service regulations.",
                    "Developed deep understanding of the local gaming clientele and service expectations."
                ]
            },
            {
                id: 3,
                role: "General Manager",
                company: "Melita’s Restaurant & Lounge",
                location: "Chiloquin, OR",
                years: "2009 – 2011",
                color: "border-yellow-500",
                summary: "Total operational oversight of Restaurant, Lounge, Motel & RV Park.",
                details: [
                    "Implemented employee training programs to assure customer satisfaction.",
                    "Enforced Oregon Health Code quality and safety controls.",
                    "Managed all record-keeping and financial reconciliation for multiple business units."
                ]
            },
            {
                id: 4,
                role: "Bartender / Team Lead",
                company: "Hollywood Bowl / Moore's",
                location: "Portland/Isleton",
                years: "2000 – 2008",
                color: "border-black",
                summary: "Leadership in entertainment and gaming venues.",
                details: [
                    "Led bar teams and supervised cocktail waitresses.",
                    "Managed Oregon Video Lottery income counting and reconciliation.",
                    "Expedited food orders and managed floor staff during live entertainment events."
                ]
            }
        ];

        // Init
        document.addEventListener('DOMContentLoaded', () => {
            renderWheelChart();
            renderTechChart();
            renderTimeline();
            updateRole(0); // Load first item
        });

        // Scroll Helper
        function scrollToId(id) {
            document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
        }

        // 1. Medicine Wheel Chart (Doughnut)
        function renderWheelChart() {
            const ctx = document.getElementById('wheelChart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Management (North)', 'Technology (East)', 'Service (South)', 'Operations (West)'],
                    datasets: [{
                        data: [25, 25, 25, 25], // Equal balance
                        backgroundColor: [
                            '#ffffff', // North/White
                            '#F2A900', // East/Yellow
                            '#D92525', // South/Red
                            '#1a1a1a'  // West/Black
                        ],
                        borderColor: '#e5e5e5',
                        borderWidth: 2,
                        hoverOffset: 10
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '60%',
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const labels = [
                                        "GM Experience, Training, Wisdom",
                                        "BS Degree, POS Systems, Innovation",
                                        "Guest Focus, Passion, Energy",
                                        "Cash Handling, Compliance, Grounding"
                                    ];
                                    return labels[context.dataIndex];
                                }
                            }
                        }
                    }
                }
            });
        }

        // 2. Tech Chart (Bar)
        function renderTechChart() {
            const ctx = document.getElementById('techChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Hospitality', 'Network Admin', 'Compliance', 'Leadership'],
                    datasets: [{
                        label: 'Skill Depth',
                        data: [95, 85, 90, 80],
                        backgroundColor: '#F2A900',
                        barThickness: 20
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: { grid: { color: '#333' }, ticks: { color: '#888' } },
                        y: { grid: { display: false }, ticks: { color: '#fff', font: { family: 'Oswald' } } }
                    },
                    plugins: { legend: { display: false } }
                }
            });
        }

        // 3. Timeline Renderer
        function renderTimeline() {
            const container = document.getElementById('timeline-container');
            
            careerData.forEach((item, index) => {
                const node = document.createElement('div');
                node.className = `timeline-node flex items-center mb-8 cursor-pointer group transition-all duration-300 transform hover:translate-x-2`;
                node.onclick = () => {
                    updateRole(index);
                    highlightNode(index);
                };
                
                // Colors for the node dots
                let dotColor = 'bg-white border-gray-400';
                if (index === 1) dotColor = 'bg-red-600 border-red-600'; // Casino

                node.innerHTML = `
                    <div class="z-10 w-8 h-8 rounded-full border-4 ${dotColor} flex-shrink-0 ml-1 shadow-sm group-hover:border-black transition-colors" id="node-${index}"></div>
                    <div class="ml-4">
                        <span class="block text-sm font-bold text-gray-400 uppercase tracking-widest">${item.years}</span>
                        <span class="block text-lg font-bold text-black group-hover:text-red-600 transition-colors tribal-font">${item.role}</span>
                    </div>
                `;
                container.appendChild(node);
            });
        }

        // 4. Update Detail View
        function updateRole(index) {
            const role = careerData[index];
            const display = document.getElementById('role-display');
            
            // Highlight logic
            document.querySelectorAll('.timeline-node div:first-child').forEach((el, i) => {
                if(i === index) el.classList.add('ring-4', 'ring-yellow-200');
                else el.classList.remove('ring-4', 'ring-yellow-200');
            });

            // Content Injection
            display.innerHTML = `
                <div class="animate-fade-in">
                    <h3 class="text-4xl font-black text-black mb-1 tribal-font">${role.role}</h3>
                    <div class="flex items-center text-red-600 font-bold mb-6 text-sm uppercase tracking-widest">
                        <span class="mr-2">📍 ${role.location}</span>
                        <span>• ${role.years}</span>
                    </div>
                    
                    <p class="text-xl font-light text-gray-800 italic mb-8 border-b border-gray-100 pb-4">
                        "${role.summary}"
                    </p>
                    
                    <h4 class="font-bold text-black uppercase tracking-widest mb-4 text-sm">Key Contributions</h4>
                    <ul class="space-y-4">
                        ${role.details.map(d => `
                            <li class="flex items-start">
                                <span clasclasss="text-yellow-500 mr-3 text-xl">▸</span>
                                <span class="text-gray-700 leading-relaxed">${d}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        }
    </script>
