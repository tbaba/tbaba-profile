import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Main page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ja">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>tbaba - Profile</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            }
            .section-container {
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .fade-in {
                animation: fadeIn 0.5s ease-in;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .link-hover:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
            .link-hover {
                transition: all 0.3s ease;
            }
        </style>
    </head>
    <body class="bg-gradient-to-br from-blue-50 to-indigo-100">
        <div id="root"></div>
        
        <script type="text/babel">
            const { useState, useEffect } = React;

            function App() {
                const [activeSection, setActiveSection] = useState('top');

                const socialLinks = [
                    { 
                        name: 'GitHub', 
                        url: 'https://github.com/tbaba', 
                        icon: 'fab fa-github',
                        color: 'bg-gray-800 hover:bg-gray-900'
                    },
                    { 
                        name: 'Forkwell', 
                        url: 'https://forkwell.com/tbaba', 
                        icon: 'fas fa-code-branch',
                        color: 'bg-blue-600 hover:bg-blue-700'
                    },
                    { 
                        name: 'Zenn', 
                        url: 'https://zenn.dev/tbaba', 
                        icon: 'fas fa-pen-nib',
                        color: 'bg-indigo-600 hover:bg-indigo-700'
                    }
                ];

                const TopSection = () => (
                    <div className="section-container fade-in">
                        <div className="text-center px-6">
                            <div className="mb-8">
                                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                                    <i className="fas fa-user text-white text-5xl"></i>
                                </div>
                                <h1 className="text-5xl font-bold text-gray-800 mb-3">tbaba</h1>
                                <p className="text-xl text-gray-600">Software Engineer / Developer</p>
                            </div>

                            <div className="flex flex-wrap justify-center gap-4 mb-8">
                                {socialLinks.map((link) => (
                                    <a 
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={\`\${link.color} text-white px-6 py-3 rounded-lg link-hover flex items-center gap-2 shadow-md\`}
                                    >
                                        <i className={\`\${link.icon} text-xl\`}></i>
                                        <span className="font-semibold">{link.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                );

                const AboutSection = () => (
                    <div className="section-container fade-in">
                        <div className="max-w-4xl mx-auto px-6">
                            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                                <h2 className="text-4xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                                    <i className="fas fa-user-circle text-indigo-600"></i>
                                    About Me
                                </h2>
                                <div className="space-y-6 text-gray-700 leading-relaxed">
                                    <p className="text-lg">
                                        はじめまして、tbabaです。
                                    </p>
                                    <p>
                                        ソフトウェアエンジニアとして、Web開発を中心に活動しています。
                                        新しい技術に触れること、そして学んだことをアウトプットすることが好きです。
                                    </p>
                                    <div className="border-l-4 border-indigo-500 pl-4 py-2 bg-indigo-50 rounded">
                                        <p className="font-semibold text-indigo-900">興味分野</p>
                                        <ul className="mt-2 space-y-1 text-indigo-800">
                                            <li><i className="fas fa-check text-indigo-600 mr-2"></i>Web開発</li>
                                            <li><i className="fas fa-check text-indigo-600 mr-2"></i>クラウドアーキテクチャ</li>
                                            <li><i className="fas fa-check text-indigo-600 mr-2"></i>オープンソース活動</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

                const PortfolioSection = () => {
                    const projects = [
                        {
                            title: 'GitHub Projects',
                            description: 'GitHubで公開している様々なプロジェクトをご覧いただけます。',
                            icon: 'fab fa-github',
                            link: 'https://github.com/tbaba',
                            color: 'from-gray-700 to-gray-900'
                        },
                        {
                            title: 'Zenn Articles',
                            description: '技術記事や学んだことをZennで発信しています。',
                            icon: 'fas fa-pen-nib',
                            link: 'https://zenn.dev/tbaba',
                            color: 'from-indigo-500 to-indigo-700'
                        },
                        {
                            title: 'Forkwell Portfolio',
                            description: '職務経歴やスキルセットをまとめています。',
                            icon: 'fas fa-code-branch',
                            link: 'https://forkwell.com/tbaba',
                            color: 'from-blue-500 to-blue-700'
                        }
                    ];

                    return (
                        <div className="section-container fade-in">
                            <div className="max-w-6xl mx-auto px-6">
                                <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center flex items-center justify-center gap-3">
                                    <i className="fas fa-briefcase text-indigo-600"></i>
                                    Portfolio
                                </h2>
                                <div className="grid md:grid-cols-3 gap-6">
                                    {projects.map((project, index) => (
                                        <a
                                            key={index}
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-white rounded-xl shadow-lg overflow-hidden link-hover"
                                        >
                                            <div className={\`bg-gradient-to-br \${project.color} p-6 text-white\`}>
                                                <i className={\`\${project.icon} text-4xl mb-4 block\`}></i>
                                                <h3 className="text-xl font-bold">{project.title}</h3>
                                            </div>
                                            <div className="p-6">
                                                <p className="text-gray-600">{project.description}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                };

                return (
                    <div>
                        {/* Navigation */}
                        <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
                            <div className="max-w-7xl mx-auto px-6">
                                <div className="flex justify-between items-center h-16">
                                    <div className="text-xl font-bold text-indigo-600">
                                        tbaba
                                    </div>
                                    <div className="flex space-x-8">
                                        <button
                                            onClick={() => setActiveSection('top')}
                                            className={\`\${activeSection === 'top' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'} font-semibold py-2 transition-all\`}
                                        >
                                            Top
                                        </button>
                                        <button
                                            onClick={() => setActiveSection('about')}
                                            className={\`\${activeSection === 'about' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'} font-semibold py-2 transition-all\`}
                                        >
                                            About
                                        </button>
                                        <button
                                            onClick={() => setActiveSection('portfolio')}
                                            className={\`\${activeSection === 'portfolio' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'} font-semibold py-2 transition-all\`}
                                        >
                                            Portfolio
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </nav>

                        {/* Content */}
                        <div className="pt-16">
                            {activeSection === 'top' && <TopSection />}
                            {activeSection === 'about' && <AboutSection />}
                            {activeSection === 'portfolio' && <PortfolioSection />}
                        </div>

                        {/* Footer */}
                        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4">
                            <div className="text-center text-gray-600 text-sm">
                                © 2024 tbaba. All rights reserved.
                            </div>
                        </footer>
                    </div>
                );
            }

            ReactDOM.render(<App />, document.getElementById('root'));
        </script>
    </body>
    </html>
  `)
})

export default app
