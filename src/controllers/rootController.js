import cryptoJS from "crypto-js";
import { render } from "pug";

const SECRET_KEY = "secret key";
let users = [];
let files = [];

export const handleHome = (req, res) => {
  return res.render("home", { title: "환영합니다" });
};

export const getSignUp = (req, res) => {
  return res.render("sign-up", { title: "회원가입" });
};

export const postSingUp = (req, res) => {
  let { id, password } = req.body;
  for (let item of users) {
    let decrypted = cryptoJS.AES.decrypt(item.id, SECRET_KEY);
    let originalText = decrypted.toString(cryptoJS.enc.Utf8);
    console.log(`originalText: ${originalText}`);
    if (id === originalText) {
      console.log("이미 있는 계정입니다.");
      return res.redirect("/sign-up");
    }
  }
  id = cryptoJS.AES.encrypt(id, SECRET_KEY).toString();
  password = cryptoJS.SHA256(password).toString();
  users.push({ id, password });
  console.log(`id: ${id}, password: ${password}`);
  console.log("계정 생성에 성공하였습니다.");
  return res.redirect("/sign-up");
};

export const getSignIn = (req, res) => {
  return res.render("sign-in", { title: "로그인" });
};

export const postSignIn = (req, res) => {
  let { id, password } = req.body;
  for (let item of users) {
    let decrypted = cryptoJS.AES.decrypt(item.id, SECRET_KEY);
    let originalText = decrypted.toString(cryptoJS.enc.Utf8);
    if (id === originalText) {
      password = cryptoJS.SHA256(password).toString();
      if (password === item.password) {
        console.log("올바른 계정입니다.");
        return res.redirect("/sign-in");
      }
    }
  }
  console.log("잘못된 계정입니다");
  return res.redirect("/sign-in");
};

export const getMod = (req, res) => {
  res.render("modulated", { title: "변조 확인" });
};

export const postMod = (req, res) => {
  const { fileName, hashingFileName } = req.body;
  const hashing = cryptoJS.MD5(fileName).toString();
  console.log(`${fileName}의 해시 값: ${hashing}`);
  if (hashingFileName === hashing) {
    console.log("올바른 파일입니다.");
    return res.redirect("/modulated");
  } else {
    console.log("변조 파일일 가능성이 높습니다.");
    return res.redirect("/modulated");
  }
};

export const getHash = (req, res) => {
  res.render("hash-value", { title: "해시 확인" });
};

export const postHash = (req, res) => {
  const { fileName } = req.body;
  const hashingFileName = cryptoJS.MD5(fileName).toString();
  console.log(`data.txt의 해시 값: ${hashingFileName}`);
  res.redirect("/hash-value");
};
