const handleSubmit = async (e) => {
  e.preventDefault();

  let newErrors = {};

  if (!validateEmail(email))
    newErrors.email = "Invalid email format.";

  if (!validatePassword(password))
    newErrors.password =
      "Password must be 8+ chars, include uppercase, lowercase, number & special character.";

  if (!isLogin && password !== confirmPassword)
    newErrors.confirm = "Passwords do not match.";

  if (captchaAnswer !== generatedCaptcha)
    newErrors.captcha = "Captcha incorrect.";

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    try {
      console.log("FORM SUBMITTED"); // DEBUG

      let res;

      if (isLogin) {
        res = await API.post("/auth/login", { email, password });
      } else {
        res = await API.post("/auth/register", {
          name: "User",
          email,
          password,
        });
      }

      console.log("Response:", res.data);

      // ✅ CHECK SUCCESS RESPONSE
      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);

        // 🔥 NAVIGATE AFTER SUCCESS
        navigate("/dashboard", { replace: true });
      } else {
        alert("Login failed: No token received");
      }

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message);
    }

  } else {
    generateCaptcha();
    setCaptchaAnswer("");
  }
};