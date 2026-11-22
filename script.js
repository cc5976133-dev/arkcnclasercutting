/*
 * ARK CNC LASER CUTTING contact settings.
 * Keep phone digits in international format for call and WhatsApp links.
 */
const ARK_CONTACT = {
  phone: "+917702929294",
  whatsapp: "917702929294",
  email: "arklasercut@gmail.com",
  address: "FF73+4G4, Shirdi Sai Nagar, Gautam Nagar, Balanagar, Hyderabad, Telangana 500042, India",
};

const contactLabels = {
  email: "Email address to be added",
};

document.querySelectorAll("[data-contact]").forEach((node) => {
  const key = node.dataset.contact;
  if (ARK_CONTACT[key]) node.textContent = ARK_CONTACT[key];
  else if (contactLabels[key]) node.textContent = contactLabels[key];
});

const feedback = document.querySelector("#form-feedback");
const mapFrame = document.querySelector("#location-map");
if (ARK_CONTACT.address && mapFrame) {
  mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(ARK_CONTACT.address)}&output=embed`;
  mapFrame.hidden = false;
  const locationNote = document.querySelector(".location-copy small");
  if (locationNote) locationNote.textContent = "View the business location on the map below.";
}
document.querySelectorAll("[data-action]").forEach((link) => {
  const action = link.dataset.action;
  const value = ARK_CONTACT[action === "call" ? "phone" : action];
  if (action === "maps" && ARK_CONTACT.address) {
    link.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ARK_CONTACT.address)}`;
  } else if (action === "call" && value) {
    link.href = `tel:${value.replace(/[^+\d]/g, "")}`;
  } else if (action === "whatsapp" && value) {
    link.href = `https://wa.me/${value.replace(/\D/g, "")}`;
    if (link.classList.contains("floating-whatsapp")) {
      link.target = "_blank";
      link.rel = "noreferrer";
    }
  } else if (action === "email" && ARK_CONTACT.email) {
    link.href = `mailto:${ARK_CONTACT.email}`;
  } else {
    link.addEventListener("click", (event) => {
      if (action === "maps") event.preventDefault();
      if (action === "call" || action === "whatsapp" || action === "maps") {
        event.preventDefault();
        document.querySelector("#contact-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
        if (feedback) {
          feedback.textContent = action === "maps" ? "Add your business address in script.js to activate the Google Maps link." : `Add your ${action === "call" ? "phone" : "WhatsApp"} number in script.js to activate this contact button.`;
          feedback.classList.add("is-error");
        }
      }
    });
  }
});

const form = document.querySelector("#contact-form");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!ARK_CONTACT.email) {
    feedback.textContent = "Add your business email in script.js before sending enquiries. Your message has not been sent.";
    feedback.classList.add("is-error");
    return;
  }
  const data = new FormData(form);
  const subject = `Project enquiry from ${data.get("name")}`;
  const body = `Name: ${data.get("name")}\nReply email: ${data.get("email")}\n\n${data.get("message")}`;
  window.location.href = `mailto:${ARK_CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  feedback.textContent = "Your email app should open with the enquiry ready to send.";
  feedback.classList.remove("is-error");
  feedback.classList.add("is-success");
});

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  nav?.classList.toggle("is-open", open);
});
nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("is-open");
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "Open navigation");
}));

// Add future designs by placing an image in assets/designs and adding an item here.
const DESIGN_GALLERY = [
  { src: "assets/designs/01-ornamental-panel.jpg", title: "Ornamental laser-cut panel", alt: "Decorative metal panel with flowing floral cutouts" },
  { src: "assets/designs/02-floral-laser-cut-panel.jpg", title: "Floral laser-cut panels", alt: "Twin metal panels with floral and scrollwork cutouts on a laser bed" },
  { src: "assets/designs/03-screen-design-collection.jpg", title: "Screen design collection", alt: "Collection of decorative laser-cut privacy screen designs" },
  { src: "assets/designs/04-decorative-panel-collection.jpg", title: "Decorative panel details", alt: "Examples of ornamental laser-cut panels and lattice screens" },
  { src: "assets/designs/05-peacock-screen.jpg", title: "Peacock motif screen", alt: "White decorative metal screen with a peacock and floral cutout pattern" },
  { src: "assets/designs/06-tree-of-life-screen.jpg", title: "Tree of life screen", alt: "Tall white laser-cut panel featuring a tree and birds" },
  { src: "assets/designs/07-floral-metal-panel.jpg", title: "Floral metal panel", alt: "Silver panel with a flowing floral laser-cut design" },
  { src: "assets/designs/08-geometric-exterior-screens.jpg", title: "Geometric exterior screens", alt: "Modern building facade with geometric metal privacy screens" },
];

const designsGrid = document.querySelector("#designs-grid");
const designsEmpty = document.querySelector("#designs-empty");
const designDialog = document.querySelector("#design-lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
let activeDesign = 0;

function showDesign(index) {
  activeDesign = (index + DESIGN_GALLERY.length) % DESIGN_GALLERY.length;
  const design = DESIGN_GALLERY[activeDesign];
  lightboxImage.src = design.src;
  lightboxImage.alt = design.alt;
  lightboxCaption.textContent = `${String(activeDesign + 1).padStart(2, "0")} / ${design.title}`;
}

if (designsGrid && DESIGN_GALLERY.length) {
  DESIGN_GALLERY.forEach((design, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "design-card reveal";
    card.setAttribute("aria-label", `Preview ${design.title}`);
    card.setAttribute("aria-haspopup", "dialog");
    card.innerHTML = `<span class="design-image-wrap"><img src="${design.src}" alt="${design.alt}" loading="lazy" decoding="async"><span class="design-image-action">VIEW DESIGN <span aria-hidden="true">↗</span></span></span><span class="design-caption"><span>DESIGN ${String(index + 1).padStart(2, "0")}</span><strong>${design.title}</strong></span>`;
    card.addEventListener("click", () => {
      showDesign(index);
      designDialog?.showModal();
    });
    designsGrid.append(card);
  });
} else if (designsEmpty) {
  designsEmpty.hidden = false;
}

document.querySelector("[data-lightbox-close]")?.addEventListener("click", () => designDialog?.close());
document.querySelector("[data-lightbox-prev]")?.addEventListener("click", () => showDesign(activeDesign - 1));
document.querySelector("[data-lightbox-next]")?.addEventListener("click", () => showDesign(activeDesign + 1));
designDialog?.addEventListener("click", (event) => {
  if (event.target === designDialog) designDialog.close();
});
designDialog?.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showDesign(activeDesign - 1);
  if (event.key === "ArrowRight") showDesign(activeDesign + 1);
});

document.querySelector("#year").textContent = new Date().getFullYear();

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
} else {
  document.querySelectorAll(".reveal").forEach((node) => node.classList.add("is-visible"));
}
