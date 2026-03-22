import './App.css'

const sections = [
  { title: 'Vehicles' },
  { title: 'Diagnostics' },
  { title: 'Maintenance' },
] as const

function App() {
  return (
    <main className="shell">
      <header className="shell-header">
        <h1 className="shell-title">ELK Wrench</h1>
        <p className="shell-subtitle">Smart garage assistant</p>
      </header>

      <div className="shell-grid">
        {sections.map(({ title }) => (
          <section key={title} className="shell-card" aria-label={title}>
            <h2 className="shell-card-title">{title}</h2>
          </section>
        ))}
      </div>
    </main>
  )
}

export default App
