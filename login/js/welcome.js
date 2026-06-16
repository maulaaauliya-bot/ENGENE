document.getElementById("registerForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const registerForm = document.getElementById('registerForm');
    const successMessage = document.getElementById('successMessage');

    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    usernameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    let isFormValid = true;

    if (username === '') {
        usernameError.textContent = 'Username tidak boleh kosong';
        isFormValid = false;
    }
    if (email === '') {
        emailError.textContent = 'Email tidak boleh kosong';
        isFormValid = false;
    }
    if (password === '') {
        passwordError.textContent = 'Password tidak boleh kosong';
        isFormValid = false;
    }

    if (!isFormValid) return;

    registerForm.classList.add('is-submitting');

    try {
        // PERBAIKAN: Teks di dalam body sekarang sudah dibungkus dengan tanda backtick (`)
        const res = await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `action=register&username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        });

        const data = await res.json();

        // Tips: Menggunakan toLowerCase() berarti teks pembandingnya juga harus huruf kecil semua
        if (data.status === "success" || data.message?.toLowerCase().includes("berhasil")) {

            localStorage.setItem("username", username);
            
            registerForm.style.opacity = '0';
            setTimeout(() => {
                registerForm.style.display = 'none';
                successMessage.classList.add('show');
                successMessage.style.display = 'flex';
            }, 400);

            setTimeout(() => {
                window.location.href = "../index.html";
            }, 2500);

        } else {
            registerForm.classList.remove('is-submitting');
            alert(data.message || "Gagal Daftar. Silakan Coba Lagi.");
        }

    } catch (error) {
        registerForm.classList.remove('is-submitting');
        console.error("Terjadi kesalahan sistem:", error);
        alert("Gagal terhubung ke Server. Periksa Koneksi Internet Anda.");
    }
});
