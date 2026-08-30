interface CopyrightProps {
  title: string;
  url: string;
}

export default function Copyright({ title, url }: CopyrightProps) {
  const siteUrl = "https://levi52.github.io";
  const fullUrl = `${siteUrl}${url}`;

  return (
    <div className="mt-10 pt-6 border-t border-border">
      <div className="text-sm text-text-muted leading-relaxed">
        <p className="mb-1">
          <span className="font-medium text-text-secondary">标题：</span>
          {title}
        </p>
        <p className="mb-1">
          <span className="font-medium text-text-secondary">作者：</span>
          Levi5
        </p>
        <p className="mb-1">
          <span className="font-medium text-text-secondary">链接：</span>
          <a href={fullUrl} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
            {fullUrl}
          </a>
        </p>
        <p className="mt-3 text-xs text-text-muted">
          本站文章除非特别声明，均为原创并采用
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline mx-1">
            CC BY-NC-SA 4.0
          </a>
          协议进行转载。转载请注明文章出处。
        </p>
      </div>
    </div>
  );
}
