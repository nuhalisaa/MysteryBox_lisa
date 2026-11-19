const puzzles = [
    {
        title: "Jejak Waktu",
        symbol: "⏳",
        description: "Aku punya wajah dan dua tangan, tetapi tidak punya kaki. Aku selalu bergerak, tetapi tidak pernah berjalan. Apakah aku?",
        hint: "Benda ini biasanya ada di dinding atau pergelangan tangan.",
        answers: ["jam", "jam tangan", "arloji"]
    },
    {
        title: "Identitas Rahasia",
        symbol: "🎭",
        description: "Semakin banyak kamu mengambil dariku, semakin besar aku jadinya. Apakah aku?",
        hint: "Kamu bisa menemukannya di tanah setelah menggali.",
        answers: ["lubang", "sebuah lubang"]
    },
    {
        title: "Kunci Terakhir",
        symbol: "🗝️",
        description: "Aku memiliki banyak gigi, tetapi tidak bisa menggigit. Aku membantu membuka sesuatu yang terkunci. Apakah aku?",
        hint: "Benda kecil ini sering dibawa di gantungan.",
        answers: ["kunci", "anak kunci"]
    }
];

let currentPuzzle = 0;
let attempts = [0, 0, 0];
let solved = [false, false, false];

const boxChoices = document.querySelectorAll(".box-choice");

function showPuzzle(index) {

    currentPuzzle = index;

    const puzzle = puzzles[index];

    document.getElementById("puzzleTitle").textContent = puzzle.title;
    document.getElementById("puzzleSymbol").textContent = puzzle.symbol;
    document.getElementById("puzzleDescription").textContent = puzzle.description;

    document.getElementById("levelLabel").textContent =
        "LEVEL 0" + (index + 1);

    document.getElementById("hintText").textContent =
        "Petunjuk: " + puzzle.hint;

    document.getElementById("hintText").hidden = true;

    document.getElementById("answerInput").value = "";
    document.getElementById("answerInput").disabled = solved[index];

    document.querySelector("#answerForm button").disabled = solved[index];

    document.getElementById("attemptText").textContent =
        "Percobaan: " + attempts[index];

    const feedback = document.getElementById("feedback");

    feedback.className = "feedback";

    feedback.textContent = solved[index]
        ? "✓ Misteri ini sudah berhasil kamu pecahkan!"
        : "Pilih jawabanmu dengan teliti, detektif.";

    boxChoices.forEach((button, i) => {

        button.classList.toggle("active", i === index);

        button.textContent = solved[i]
            ? "✓ " + puzzles[i].title
            : (i + 1 === index + 1
                ? "▶️ " + puzzles[i].title
                : "🔒 " + puzzles[i].title);

    });

    updateProgress();
}

// MEMILIH KOTAK
boxChoices.forEach(button => {

    button.addEventListener("click", () => {

        showPuzzle(Number(button.dataset.index));

    });

});

// MENAMPILKAN PETUNJUK
document.getElementById("hintBtn").addEventListener("click", () => {

    const hint = document.getElementById("hintText");

    hint.hidden = !hint.hidden;

});

// MEMERIKSA JAWABAN
document.getElementById("answerForm").addEventListener("submit", event => {

    event.preventDefault();

    if (solved[currentPuzzle]) return;

    const answer = document.getElementById("answerInput")
        .value.trim().toLowerCase();

    const puzzle = puzzles[currentPuzzle];

    const feedback = document.getElementById("feedback");

    if (answer === "") {
        return;
    }

    attempts[currentPuzzle]++;

    document.getElementById("attemptText").textContent =
        "Percobaan: " + attempts[currentPuzzle];

    if (puzzle.answers.includes(answer)) {

        solved[currentPuzzle] = true;

        feedback.textContent =
            "🎉 Tepat sekali! Kamu berhasil membuka kotak misteri!";

        feedback.className = "feedback success";

        document.getElementById("answerInput").disabled = true;

        document.querySelector("#answerForm button").disabled = true;

        updateProgress();

        if (solved.every(Boolean)) {

            feedback.textContent =
                "🏆 Luar biasa! Semua misteri berhasil kamu pecahkan. Kamu adalah detektif sejati!";

        }

    } else {

        feedback.textContent =
            "Belum tepat. Coba pikirkan lagi atau gunakan petunjuk!";

        feedback.className = "feedback error";

    }

});

// MENGHITUNG PROGRES
function updateProgress() {

    const count = solved.filter(Boolean).length;

    document.getElementById("progressText").textContent =
        count + "/3";

    document.getElementById("progressFill").style.width =
        (count / 3 * 100) + "%";

}

// DARK MODE DAN LIGHT MODE
document.getElementById("themeToggle").addEventListener("click", () => {

    document.body.classList.toggle("light");

    document.getElementById("themeToggle").textContent =
        document.body.classList.contains("light") ? "☀️" : "☾";

});

// MENU RESPONSIVE
const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    const opened = navLinks.classList.toggle("open");

    menuToggle.textContent = opened ? "✕" : "☰";

});

navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.textContent = "☰";

    });

});

// MENAMPILKAN KOTAK PERTAMA
showPuzzle(0);