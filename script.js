const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const legendList = document.getElementById("legendList");
const tooltip = document.getElementById("tooltip");

const partColors = {
  "Face": "#e6194B",
  "Left Arm": "#3cb44b",
  "Right Arm": "#ffe119",
  "Left Elbow": "#4363d8",
  "Right Elbow": "#f58231",
  "Left Hand": "#911eb4",
  "Right Hand": "#46f0f0",
  "Left Leg": "#f032e6",
  "Right Leg": "#bcf60c",
  "Left Knee": "#fabebe",
  "Right Knee": "#008080",
  "Left Foot": "#e6beff",
  "Right Foot": "#9a6324",
};

const keypointMap = {
  "nose": "Face",
  "left_eye": "Face",
  "right_eye": "Face",
  "left_shoulder": "Left Arm",
  "right_shoulder": "Right Arm",
  "left_elbow": "Left Elbow",
  "right_elbow": "Right Elbow",
  "left_wrist": "Left Hand",
  "right_wrist": "Right Hand",
  "left_hip": "Left Leg",
  "right_hip": "Right Leg",
  "left_knee": "Left Knee",
  "right_knee": "Right Knee",
  "left_ankle": "Left Foot",
  "right_ankle": "Right Foot"
};


for (const [part, color] of Object.entries(partColors)) {
  const li = document.createElement("li");
  li.innerHTML = `<span class="color-box" style="background:${color}"></span>${part}`;
  legendList.appendChild(li);
}

let keypoints = [];
let imgRef = null;


document.getElementById("upload").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const img = new Image();
  img.src = URL.createObjectURL(file);
  await img.decode();
  imgRef = img;

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  const detector = await poseDetection.createDetector(
    poseDetection.SupportedModels.MoveNet,
    { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING }
  );

  const poses = await detector.estimatePoses(img);
  if (poses.length > 0) {
    keypoints = poses[0].keypoints;
    drawImageAndKeypoints();
  }
});

function drawImageAndKeypoints() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (imgRef) ctx.drawImage(imgRef, 0, 0);

  keypoints.forEach(kp => {
    if (kp.score < 0.5) return;
    const label = keypointMap[kp.name];
    if (!label) return;

    ctx.beginPath();
    ctx.arc(kp.x, kp.y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = partColors[label];
    ctx.fill();
  });
}


canvas.addEventListener("mousemove", (e) => {
  if (!keypoints.length || !imgRef) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  let hovered = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(imgRef, 0, 0);

  keypoints.forEach(kp => {
    if (kp.score < 0.5) return;
    const label = keypointMap[kp.name];
    if (!label) return;

    const distance = Math.hypot(kp.x - x, kp.y - y);
    const isHover = distance < 12;

    ctx.beginPath();
    ctx.arc(kp.x, kp.y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = isHover ? "black" : partColors[label];
    ctx.fill();

    if (isHover) {
      hovered = true;
      tooltip.style.display = "block";
      tooltip.style.left = `${e.pageX + 10}px`;
      tooltip.style.top = `${e.pageY - 30}px`;
      tooltip.textContent = label;
    }
  });

  if (!hovered) {
    tooltip.style.display = "none";
  }
});
