const likeButton = document.querySelector("#like");
const followButton = document.querySelector("#follow");
const image = document.querySelector("#image");
const introduceSection = document.querySelector("#introduce");
const imageButton = document.querySelector(".show-image");
const imgContainer = document.querySelector("#img-container");
const followingBadge = document.querySelector(".following");
const interactionButton = document.querySelector("#interaction");
const interactionDescription = document.querySelector("#description");

const colorArray = [
  "#F6D0B1",
  "#DDF093",
  "#90E39A",
  "#CE4760",
  "#CC082C",
  "#BCE7FD",
  "#21FA90",
  "#613F75",
  "#9067C6",
];

const showImg = (e) => {
  const classList = e.target.classList;
  if (classList.contains("Mozart")) {
    image.src = "./img/Mozart.png";
    imgContainer.dataset.category = "Mozart";
  } else {
    image.src = "./img/WangGalbiTang.png";
    imgContainer.dataset.category = "WangGalbiTang";
  }
  imgContainer.classList.add("show");
};

const flipPage = (direction) => {
  const counter = Number(image.src.split("/").pop().split(".").shift());
  const category = imgContainer.dataset.category;
  let newCounter;
  if (direction === "right") {
    newCounter = counter === 7 ? 1 : counter + 1;
  } else {
    newCounter = counter === 1 ? 7 : counter - 1;
  }
  const src = `./img/${category}/`;
  image.src = `${src}${newCounter}.jpg`;
};

const handleLikeButton = () => {
  const likeCount = Number(likeButton.innerText.split(" ")[1]);
  if (likeCount === 99) alert("감사합니다! 더이상 좋아요는 증가하지 않습니다.");
  if (likeCount === 100) return;
  likeButton.innerText = `좋아요 ${likeCount + 1}`;
  colorArray.forEach((color, index) => {
    if (likeCount + 1 >= 10 * (index + 1)) likeButton.style.backgroundColor = color;
  });
};

const toggleInteraction = () => {
  interactionDescription.classList.toggle("show");
};
const handleFollowButton = () => {
  const follow = followButton.classList.contains("followed");
  let answer = true;
  if (follow) {
    answer = confirm("팔로우를 취소하시겠습니까?");
    if (answer) {
      followButton.innerText = "팔로우";
      followingBadge.classList.remove("show");
    }
  } else {
    followButton.innerText = "팔로우 취소";
    followingBadge.classList.add("show");
  }
  answer && followButton.classList.toggle("followed");
};

likeButton.addEventListener("click", handleLikeButton);
followButton.addEventListener("click", handleFollowButton);
introduceSection.addEventListener("click", (e) => {
  if (e.target.classList.contains("show-image")) showImg(e);
});

document.querySelector(".fa-chevron-right").addEventListener("click", () => flipPage("right"));
document.querySelector(".fa-chevron-left").addEventListener("click", () => flipPage("left"));
interactionButton.addEventListener("click", toggleInteraction);
document.querySelector(".close").addEventListener("click", toggleInteraction);
