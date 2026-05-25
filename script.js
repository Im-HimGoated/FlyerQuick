const state = {
  template: "club",
  palette: "fresh",
};

const copy = {
  club: "Community event",
  market: "Local gathering",
  volunteer: "Neighbors together",
  showcase: "One day only",
};

const inputs = {
  title: document.querySelector("#titleInput"),
  date: document.querySelector("#dateInput"),
  location: document.querySelector("#locationInput"),
  cta: document.querySelector("#ctaInput"),
  details: document.querySelector("#detailsInput"),
  image: document.querySelector("#imageInput"),
};

const flyer = document.querySelector("#flyer");
const flyerArt = document.querySelector("#flyerArt");
const flyerImage = document.querySelector("#flyerImage");
const imageStatus = document.querySelector("#imageStatus");
const output = {
  title: document.querySelector("#flyerTitle"),
  date: document.querySelector("#flyerDate"),
  location: document.querySelector("#flyerLocation"),
  cta: document.querySelector("#flyerCta"),
  details: document.querySelector("#flyerDetails"),
  kicker: document.querySelector("#flyerKicker"),
};

function clean(value, fallback) {
  return value.trim() || fallback;
}

function render() {
  output.title.textContent = clean(inputs.title.value, "Untitled Event");
  output.date.textContent = clean(inputs.date.value, "Date and time");
  output.location.textContent = clean(inputs.location.value, "Location");
  output.cta.textContent = clean(inputs.cta.value, "Join us");
  output.details.textContent = clean(inputs.details.value, "Add a short description for the event.");
  output.kicker.textContent = copy[state.template];

  flyer.className = [
    "flyer",
    `template-${state.template}`,
    `palette-${state.palette}`,
    flyerArt.classList.contains("has-image") ? "has-image" : "",
    output.title.textContent.length > 25 ? "compact-title" : "",
    output.title.textContent.length > 38 ? "long-title" : "",
  ].filter(Boolean).join(" ");
}

Object.values(inputs).forEach((input) => {
  if (input.type !== "file") {
    input.addEventListener("input", render);
  }
});

document.querySelector("#templateChoices").addEventListener("click", (event) => {
  const button = event.target.closest("[data-template]");
  if (!button) return;
  state.template = button.dataset.template;
  document.querySelectorAll("[data-template]").forEach((item) => {
    item.classList.toggle("is-active", item === button);
  });
  render();
});

document.querySelector("#paletteChoices").addEventListener("click", (event) => {
  const button = event.target.closest("[data-palette]");
  if (!button) return;
  state.palette = button.dataset.palette;
  document.querySelectorAll("[data-palette]").forEach((item) => {
    item.classList.toggle("is-active", item === button);
  });
  render();
});

inputs.image.addEventListener("change", () => {
  const [file] = inputs.image.files;
  if (!file) return;
  imageStatus.textContent = file.name;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    flyerImage.src = reader.result;
    flyerArt.classList.add("has-image");
    render();
  });
  reader.readAsDataURL(file);
});

document.querySelector("#clearImageBtn").addEventListener("click", () => {
  inputs.image.value = "";
  flyerImage.removeAttribute("src");
  flyerArt.classList.remove("has-image");
  imageStatus.textContent = "No image selected";
  render();
});

document.querySelector("#exportBtn").addEventListener("click", () => {
  window.print();
});

render();
