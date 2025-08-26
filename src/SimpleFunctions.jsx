export default function checkLoginLink(isAuth, navigate, redirectPathIfAuth) {
  if (!isAuth) {
    navigate("/notlogin");
  } else {
    navigate(redirectPathIfAuth);
  }
}
