export default function CircuitHeroBackground() {
  return (
    <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2360a5fa;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%2322d3ee;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='none' stroke='url(%23grad1)' stroke-width='1' stroke-linecap='round'%3E%3Cpath d='M0 20 L60 20 L60 40 L100 40' /%3E%3Cpath d='M200 60 L140 60 L140 80 L100 80' /%3E%3Cpath d='M0 100 L40 100 L40 120 L80 120' /%3E%3Cpath d='M200 140 L160 140 L160 120 L120 120' /%3E%3Cpath d='M0 180 L50 180 L50 160 L90 160' /%3E%3Cpath d='M20 0 L20 50 L40 50 L40 90' /%3E%3Cpath d='M60 200 L60 150 L80 150 L80 110' /%3E%3Cpath d='M100 0 L100 30 L120 30 L120 70' /%3E%3Cpath d='M140 200 L140 170 L160 170 L160 130' /%3E%3Cpath d='M180 0 L180 40 L160 40 L160 80' /%3E%3Ccircle cx='60' cy='20' r='2' fill='%2322d3ee' /%3E%3Ccircle cx='140' cy='60' r='2' fill='%2322d3ee' /%3E%3Ccircle cx='40' cy='100' r='2' fill='%2322d3ee' /%3E%3Ccircle cx='160' cy='140' r='2' fill='%2322d3ee' /%3E%3Ccircle cx='50' cy='180' r='2' fill='%2322d3ee' /%3E%3Ccircle cx='20' cy='50' r='2' fill='%2360a5fa' /%3E%3Ccircle cx='60' cy='150' r='2' fill='%2360a5fa' /%3E%3Ccircle cx='100' cy='30' r='2' fill='%2360a5fa' /%3E%3Ccircle cx='140' cy='170' r='2' fill='%2360a5fa' /%3E%3Ccircle cx='180' cy='40' r='2' fill='%2360a5fa' /%3E%3Crect x='45' y='45' width='10' height='10' fill='none' stroke='%23a78bfa' stroke-width='1' /%3E%3Crect x='145' y='85' width='10' height='10' fill='none' stroke='%23a78bfa' stroke-width='1' /%3E%3Crect x='85' y='125' width='10' height='10' fill='none' stroke='%23a78bfa' stroke-width='1' /%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      <div className="absolute top-10 left-10 w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_2px_rgba(0,233,254,0.8)]" style={{ backgroundColor: '#00e9fe', animationDuration: '2s' }} />
      <div className="absolute top-20 right-20 w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_2px_rgba(0,233,254,0.8)]" style={{ backgroundColor: '#00e9fe', animationDelay: '0.5s', animationDuration: '2.5s' }} />
      <div className="absolute bottom-20 left-20 w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_2px_rgba(0,233,254,0.8)]" style={{ backgroundColor: '#00e9fe', animationDelay: '1s', animationDuration: '3s' }} />
      <div className="absolute bottom-10 right-10 w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_2px_rgba(0,233,254,0.8)]" style={{ backgroundColor: '#00e9fe', animationDelay: '1.5s', animationDuration: '2s' }} />
      <div className="absolute top-1/2 left-1/4 w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_2px_rgba(0,233,254,0.8)]" style={{ backgroundColor: '#00e9fe', animationDelay: '0.8s', animationDuration: '2.8s' }} />
      <div className="absolute top-1/3 right-1/3 w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_2px_rgba(0,233,254,0.8)]" style={{ backgroundColor: '#00e9fe', animationDelay: '1.2s', animationDuration: '2.2s' }} />
      <div className="absolute top-1/4 left-1/2 w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_2px_rgba(0,233,254,0.8)]" style={{ backgroundColor: '#00e9fe', animationDelay: '0.3s', animationDuration: '2.4s' }} />
      <div className="absolute bottom-1/3 right-1/2 w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_2px_rgba(0,233,254,0.8)]" style={{ backgroundColor: '#00e9fe', animationDelay: '1.8s', animationDuration: '2.6s' }} />
      <div className="absolute top-2/3 left-1/3 w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_2px_rgba(0,233,254,0.8)]" style={{ backgroundColor: '#00e9fe', animationDelay: '0.6s', animationDuration: '3.2s' }} />

      <div className="absolute top-1/4 right-10 w-16 h-16 border-2 border-cyan-400/30 rounded-lg animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-10 w-20 h-20 border-2 border-purple-400/30 rounded-lg animate-pulse-slow" style={{ animationDelay: '1s' }} />
    </div>
  )
}
