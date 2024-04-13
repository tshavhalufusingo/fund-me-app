import Image from "next/image";
import styles from "../page.module.css";
import "../styles.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <form>
        <input type="email" placeholder="User email"></input>
        <input type="password" placeholder="User password"></input>
        <input type="password" placeholder="Re-enter User password"></input>
        <button type="submit">Register</button>
      </form>
      <p>If you already have an account click login below</p>
      <button id="register" type="submit">
        <Link href="/">Login</Link>
      </button>
    </main>
  );
}
