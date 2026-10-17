/* PetVora shared helpers */
window.PV = (function () {
  var STICKERS = { golden: "/img/golden.jpg", labrador: "/img/labrador.jpg", beagle: "/img/beagle.jpg", shepherd: "/img/shepherd.jpg" };
  var KEYS = { "golden retriever": "golden", "labrador retriever": "labrador", "beagle": "beagle", "german shepherd": "shepherd" };
  function breedKey(name) { return KEYS[String(name || "").trim().toLowerCase()] || ""; }

  var RENAME = {"Maltese dog": "Maltese", "Boston bull": "Boston Terrier", "Pekinese": "Pekingese", "Lhasa": "Lhasa Apso", "Scotch terrier": "Scottish Terrier", "bluetick": "Bluetick Coonhound", "redbone": "Redbone Coonhound", "basset": "Basset Hound", "Airedale": "Airedale Terrier", "cairn": "Cairn Terrier", "clumber": "Clumber Spaniel", "English springer": "English Springer Spaniel", "groenendael": "Belgian Sheepdog", "malinois": "Belgian Malinois", "kelpie": "Australian Kelpie", "Pembroke": "Pembroke Welsh Corgi", "Cardigan": "Cardigan Welsh Corgi", "chow": "Chow Chow", "malamute": "Alaskan Malamute", "Doberman": "Doberman Pinscher", "Brabancon griffon": "Brussels Griffon", "Walker hound": "Treeing Walker Coonhound", "Blenheim spaniel": "Cavalier King Charles Spaniel", "Japanese spaniel": "Japanese Chin", "Mexican hairless": "Xoloitzcuintli", "Staffordshire bullterrier": "Staffordshire Bull Terrier", "wire-haired fox terrier": "Wire Fox Terrier", "German short-haired pointer": "German Shorthaired Pointer", "Shih-Tzu": "Shih Tzu", "Eskimo dog": "American Eskimo Dog", "bull mastiff": "Bullmastiff", "toy terrier": "English Toy Terrier", "EntleBucher": "Entlebucher Mountain Dog", "Appenzeller": "Appenzeller Sennenhund", "Great Pyrenees": "Great Pyrenees", "toy poodle": "Toy Poodle", "miniature poodle": "Miniature Poodle", "standard poodle": "Standard Poodle", "pug": "Pug", "boxer": "Boxer", "dalmatian": "Dalmatian", "vizsla": "Vizsla", "komondor": "Komondor", "kuvasz": "Kuvasz", "briard": "Briard", "papillon": "Papillon", "whippet": "Whippet", "borzoi": "Borzoi", "basenji": "Basenji", "collie": "Collie", "keeshond": "Keeshond", "schipperke": "Schipperke", "otterhound": "Otterhound", "bloodhound": "Bloodhound"};
  var RAW = ["Chihuahua", "Japanese spaniel", "Maltese dog", "Pekinese", "Shih-Tzu", "Blenheim spaniel", "papillon", "toy terrier", "Rhodesian ridgeback", "Afghan hound", "basset", "beagle", "bloodhound", "bluetick", "black-and-tan coonhound", "Walker hound", "English foxhound", "redbone", "borzoi", "Irish wolfhound", "Italian greyhound", "whippet", "Ibizan hound", "Norwegian elkhound", "otterhound", "Saluki", "Scottish deerhound", "Weimaraner", "Staffordshire bullterrier", "American Staffordshire terrier", "Bedlington terrier", "Border terrier", "Kerry blue terrier", "Irish terrier", "Norfolk terrier", "Norwich terrier", "Yorkshire terrier", "wire-haired fox terrier", "Lakeland terrier", "Sealyham terrier", "Airedale", "cairn", "Australian terrier", "Dandie Dinmont", "Boston bull", "miniature schnauzer", "giant schnauzer", "standard schnauzer", "Scotch terrier", "Tibetan terrier", "silky terrier", "soft-coated wheaten terrier", "West Highland white terrier", "Lhasa", "flat-coated retriever", "curly-coated retriever", "golden retriever", "Labrador retriever", "Chesapeake Bay retriever", "German short-haired pointer", "vizsla", "English setter", "Irish setter", "Gordon setter", "Brittany spaniel", "clumber", "English springer", "Welsh springer spaniel", "cocker spaniel", "Sussex spaniel", "Irish water spaniel", "kuvasz", "schipperke", "groenendael", "malinois", "briard", "kelpie", "komondor", "Old English sheepdog", "Shetland sheepdog", "collie", "Border collie", "Bouvier des Flandres", "Rottweiler", "German shepherd", "Doberman", "miniature pinscher", "Greater Swiss Mountain dog", "Bernese mountain dog", "Appenzeller", "EntleBucher", "boxer", "bull mastiff", "Tibetan mastiff", "French bulldog", "Great Dane", "Saint Bernard", "Eskimo dog", "malamute", "Siberian husky", "dalmatian", "affenpinscher", "basenji", "pug", "Leonberg", "Newfoundland", "Great Pyrenees", "Samoyed", "Pomeranian", "chow", "keeshond", "Brabancon griffon", "Pembroke", "Cardigan", "toy poodle", "miniature poodle", "standard poodle", "Mexican hairless"];
  function titleCase(s) { return s.split(" ").map(function (w) { return w ? w.charAt(0).toUpperCase() + w.slice(1) : w; }).join(" "); }
  function niceBreed(className) { var f = String(className).split(",")[0].trim(); return RENAME[f] || titleCase(f); }
  var BREEDS = RAW.map(niceBreed).concat(["Indian Pariah (Desi)", "Mixed Breed"]);
  BREEDS = BREEDS.filter(function (x, i) { return BREEDS.indexOf(x) === i; }).sort();
  function isBreed(n) { return BREEDS.indexOf(n) !== -1; }

  /* ---- age: grows with days automatically ---- */
  function ageFrom(dobStr) {
    var p = dobStr.split("-").map(Number), n = new Date();
    var y = n.getFullYear() - p[0], m = n.getMonth() + 1 - p[1], d = n.getDate() - p[2];
    if (d < 0) { m--; d += new Date(n.getFullYear(), n.getMonth(), 0).getDate(); }
    if (m < 0) { y--; m += 12; }
    if (y < 0) { y = 0; m = 0; d = 0; }
    return { y: y, m: m, d: d };
  }
  function plural(n, w) { return n + " " + w + (n === 1 ? "" : "s"); }
  function ageText(a) {
    var parts = [];
    if (a.y) parts.push(plural(a.y, "year"));
    if (a.m) parts.push(plural(a.m, "month"));
    if (!parts.length) parts.push(plural(a.d, "day"));
    return parts.join(" ");
  }
  function dobFromYM(years, months) {
    var n = new Date(), total = n.getFullYear() * 12 + n.getMonth() - (years * 12 + months);
    var y = Math.floor(total / 12), m = total % 12;
    var dim = new Date(y, m + 1, 0).getDate(), d = Math.min(n.getDate(), dim);
    return y + "-" + String(m + 1).padStart(2, "0") + "-" + String(d).padStart(2, "0");
  }

  /* ---- resize photos in the browser so uploads are small and never fail ---- */
  function compress(file, maxSide, quality) {
    return new Promise(function (resolve, reject) {
      var fr = new FileReader();
      fr.onerror = function () { reject(new Error("read")); };
      fr.onload = function () {
        var img = new Image();
        img.onerror = function () { reject(new Error("img")); };
        img.onload = function () {
          var s = Math.min(1, maxSide / Math.max(img.width, img.height));
          var c = document.createElement("canvas");
          c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
          c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
          resolve(c.toDataURL("image/jpeg", quality));
        };
        img.src = fr.result;
      };
      fr.readAsDataURL(file);
    });
  }

  /* ---- paw decoration ---- */
  var PAW = '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><ellipse cx="32" cy="42" rx="14" ry="11"/><ellipse cx="14" cy="26" rx="6" ry="8" transform="rotate(-20 14 26)"/><ellipse cx="26" cy="17" rx="6" ry="8.5" transform="rotate(-6 26 17)"/><ellipse cx="38" cy="17" rx="6" ry="8.5" transform="rotate(6 38 17)"/><ellipse cx="50" cy="26" rx="6" ry="8" transform="rotate(20 50 26)"/></g></svg>';
  function mountPaws(el, seed, count) {
    var s = 0; for (var i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) % 100003;
    function rnd() { s = (s * 16807 + 11) % 2147483647; return s / 2147483647; }
    var h = "";
    for (var j = 0; j < (count || 16); j++) {
      var size = 28 + rnd() * 46;
      h += '<i style="left:' + (rnd() * 94).toFixed(1) + '%;top:' + (rnd() * 96).toFixed(1) + '%;width:' + size.toFixed(0) + 'px;height:' + size.toFixed(0) + 'px;transform:rotate(' + (rnd() * 360 | 0) + 'deg);opacity:' + (0.07 + rnd() * 0.09).toFixed(2) + '">' + PAW + '</i>';
    }
    el.innerHTML = h;
  }

  function telLink(phone) {
    var d = phone.replace(/[^\d+]/g, "");
    if (d.charAt(0) !== "+") { if (d.length === 10) d = "+91" + d; else d = "+" + d; }
    return d;
  }
  function mapLink(r) {
    if (r.lat != null && r.lng != null) return "https://www.google.com/maps/search/?api=1&query=" + r.lat + "," + r.lng;
    if (r.mapLink) return r.mapLink;
    if (r.address) return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(r.address);
    return "";
  }
  return { STICKERS: STICKERS, breedKey: breedKey, niceBreed: niceBreed, BREEDS: BREEDS, isBreed: isBreed, ageFrom: ageFrom, ageText: ageText, dobFromYM: dobFromYM, compress: compress, PAW: PAW, mountPaws: mountPaws, telLink: telLink, mapLink: mapLink };
})();
