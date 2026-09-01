import Image from "next/image";
import githubData from "@/lib/github-data.json";
import ColorPicker from "@/components/ColorPicker";

const { profile, repos } = githubData;

const langColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Unknown: "#999",
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10 animate-slide-in-up">
        <p className="text-sm text-text-muted tracking-widest uppercase mb-3">About</p>
        <h1 className="font-heading text-3xl tracking-tight">关于</h1>
      </div>

      <section className="flex flex-col md:flex-row gap-10 mb-16 animate-slide-in-up delay-100">
        <div className="shrink-0">
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={128}
            height={128}
            className="w-32 h-32 rounded-2xl border border-border hover:border-accent hover:shadow-lg transition-all duration-300"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold tracking-tight mb-1">{profile.name}</h2>
          <p className="text-text-muted text-sm mb-4">@{profile.login}</p>
          <p className="text-text-secondary leading-relaxed mb-6">{profile.bio}</p>
          <div className="flex items-center gap-6 text-sm text-text-muted">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <span>{profile.publicRepos} repositories</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Joined {new Date(profile.created).toLocaleDateString("zh-CN", { year: "numeric", month: "long" })}</span>
            </div>
          </div>
          <div className="mt-6">
            <a
              href={`https://github.com/${profile.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-text text-bg text-sm font-medium rounded-full hover:brightness-110 hover:shadow-lg transition-all duration-300 ease-out"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-heading text-xl tracking-tight mb-6 animate-slide-in-up delay-200">开源项目</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {repos.map((repo, i) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group p-5 bg-surface border border-border rounded-xl hover:border-border-hover hover:shadow-[var(--shadow-hover)] transition-all duration-300 animate-slide-in-up delay-${Math.min((i + 3) * 100, 600)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-semibold text-text group-hover:text-accent transition-colors duration-200">
                  {repo.name}
                </h3>
                {repo.stars > 0 && (
                  <span className="flex items-center gap-1 text-xs text-text-muted">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.782 1.4 8.171L12 19.896l-7.334 3.268 1.4-8.171L.132 9.211l8.2-1.193z"/>
                    </svg>
                    {repo.stars}
                  </span>
                )}
              </div>
              <p className="text-xs text-text-secondary leading-relaxed mb-3 line-clamp-2">
                {repo.description}
              </p>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-xs text-text-muted">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: langColors[repo.language] || langColors.Unknown }}
                  ></span>
                  {repo.language}
                </span>
                {repo.topics.length > 0 && (
                  <div className="flex gap-1">
                    {repo.topics.slice(0, 3).map((t) => (
                      <span key={t} className="text-xs px-1.5 py-0.5 bg-bg-secondary text-text-muted rounded hover:bg-accent/10 hover:text-accent transition-colors duration-200">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-16 animate-slide-in-up delay-400">
        <ColorPicker />
      </section>
    </div>
  );
}
