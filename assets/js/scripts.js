// ====== KONFIGURASI CEPAT (EDIT DI SINI) ======
const CONFIG = {
  waNumber: "6283834366608",
  waDisplay: "+62 838-3436-6608",
  instagramUrl: "https://instagram.com/",

  typingWords: ["UMKM Batuah", "Produk Rumah Tangga", "Parfum & Kopi"],

  aboutImages: [
    "./assets/images/about/toko1.jpg",
    "./assets/images/about/toko2.jpg",
    "./assets/images/about/toko3.jpg"
  ]
};
// ==============================================

// Helper: aman ambil element
const $id = (id) => document.getElementById(id);

// AOS init (AMAN)
if (window.AOS) {
  AOS.init({ duration: 900, once: true });
} else {
  console.warn("AOS gagal load (CDN). Animasi scroll tidak aktif.");
}

// Modal (AMAN)
const openModalBtn = $id("open-modal");
if (openModalBtn) {
  openModalBtn.addEventListener("click", () => {
    if (!window.bootstrap) {
      console.warn("Bootstrap JS gagal load (CDN). Modal tidak bisa dibuka.");
      return;
    }
    const modalEl = $id("myModal");
    if (!modalEl) return;
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  });
}

// Set WA & IG links (AMAN)
const waLink = `https://wa.me/${CONFIG.waNumber}`;

const waBtn = $id("wa-link");
if (waBtn) waBtn.href = waLink;

const igBtn = $id("ig-link");
if (igBtn) igBtn.href = CONFIG.instagramUrl;

const ctaOrder = $id("cta-order");
if (ctaOrder) {
  ctaOrder.href = `${waLink}?text=${encodeURIComponent("Halo UMKM Batuah, saya mau order produk.")}`;
}

const ctaMitra = $id("cta-mitra");
if (ctaMitra) {
  ctaMitra.href = `${waLink}?text=${encodeURIComponent("Halo UMKM Batuah, saya mau gabung mitra/reseller.")}`;
}

const waDisplayEl = $id("wa-display");
if (waDisplayEl) waDisplayEl.textContent = CONFIG.waDisplay;

// Typing Text (AMAN)
const typingEl = $id("typing-text");
if (typingEl) {
  const words = CONFIG.typingWords;
  let wIndex = 0, cIndex = 0, deleting = false;

  function typeLoop() {
    const current = words[wIndex];
    if (!deleting) {
      typingEl.textContent = current.slice(0, cIndex++);
      if (cIndex > current.length + 10) deleting = true;
    } else {
      typingEl.textContent = current.slice(0, cIndex--);
      if (cIndex <= 0) {
        deleting = false;
        wIndex = (wIndex + 1) % words.length;
      }
    }
    setTimeout(typeLoop, deleting ? 45 : 70);
  }
  typeLoop();
} else {
  console.warn("#typing-text tidak ditemukan.");
}

// Dynamic About Image (AMAN)
const dynamicImage = $id("dynamicImage");
if (dynamicImage && CONFIG.aboutImages?.length) {
  let imgIdx = 0;

  function swapImage() {
    dynamicImage.src = CONFIG.aboutImages[imgIdx];
    imgIdx = (imgIdx + 1) % CONFIG.aboutImages.length;
  }
  swapImage();
  setInterval(swapImage, 3500);
}

// Isotope Product Filter (AMAN)
if (window.jQuery && window.jQuery.fn && window.jQuery.fn.isotope) {
  $(window).on("load", function () {
    const $grid = $(".product-container").isotope({
      itemSelector: ".product-item",
      layoutMode: "fitRows",
    });

    $("#product-flters li").on("click", function () {
      $("#product-flters li").removeClass("filter-active");
      $(this).addClass("filter-active");
      $grid.isotope({ filter: $(this).data("filter") });
    });
  });
} else {
  console.warn("jQuery/Isotope gagal load (CDN). Filter produk tidak aktif.");
}

// Form WhatsApp
function sendWhatsAppMessage(event) {
  event.preventDefault();
  const name = $id("g-name")?.value.trim() || "";
  const email = $id("g-email")?.value.trim() || "";
  const msg = $id("g-msg")?.value.trim() || "";

  const text = encodeURIComponent(
    `Halo UMKM Batuah,\n\nNama: ${name}\nEmail: ${email}\nPesan: ${msg}`
  );
  window.open(`https://wa.me/${CONFIG.waNumber}?text=${text}`, "_blank");
}
window.sendWhatsAppMessage = sendWhatsAppMessage;