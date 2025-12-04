class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return [
      "title",
      "role",
      "image",
      "image-small",
      "alt",
      "link",
      "link-text",
    ];
  }

  attributeChangedCallback() {
    if (this.shadowRoot.innerHTML) {
      this.render();
    }
  }

  render() {
    const title = this.getAttribute("title") || "Project Title";
    const role = this.getAttribute("role") || "Role";
    const image = this.getAttribute("image") || "";
    const imageSmall = this.getAttribute("image-small") || image;
    const alt = this.getAttribute("alt") || title;
    const link = this.getAttribute("link") || "#";
    const linkText = this.getAttribute("link-text") || "Learn More";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: var(--card-bg);
          border-radius: var(--radius);
          padding: 2rem;
          box-shadow: 0 4px 14px var(--shadow);
          transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        :host(:hover) {
          transform: translateY(-8px);
          box-shadow: 0 8px 24px var(--hover-shadow);
        }
          
        article {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 1.5rem;
          box-sizing: border-box;   
        }

        h2 {
          color: var(--dark-blue);
          margin: 0 0 0.5rem 0;
        }

        h3 {
          color: var(--muted);
          margin: 0 0 1rem 0;
        }

        picture {
          display: block;
          margin-bottom: 1rem;
        }

        img {
          width: 100%;
          height: auto;
          object-fit: cover;
          object-position: center;
          border-radius: 8px;
          display: block;
        }

        .description {
          color: var(--muted);
          margin-bottom: 1rem;
          flex-grow: 1;
        }

        ::slotted(p) {
          color: var(--muted);
          margin: 0 0 0.75rem 0;
        }

        ::slotted(ul) {
          color: var(--muted);
          margin: 0 0 1rem 1.5rem;
          line-height: 1.6;
        }

        ::slotted(li) {
          margin-bottom: 0.5rem;
        }

        .link {
          color: var(--dark-blue);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease;
          display: inline-block;
          margin-top: auto;
        }

        .link:hover {
          text-decoration: underline;
          color: var(--button-hover);
        }

      </style>

      <article>
        <h2>${title}</h2>
        <h3>${role}</h3>
        
        <picture>
          <source media="(max-width: 600px)" srcset="${imageSmall}" type="image/webp">
          <source srcset="${image}" type="image/webp">
          <img 
            src="${image.replace(".webp", ".jpg")}" 
            alt="${alt}"
            loading="lazy"
          >
        </picture>

        <div class="description">
          <slot></slot>
        </div>

        <a href="${link}" class="link" target="_blank" rel="noopener noreferrer">
          ${linkText}
        </a>
      </article>
    `;
  }
}

customElements.define("project-card", ProjectCard);
