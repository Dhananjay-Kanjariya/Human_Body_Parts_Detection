# 🧍 Human Body Part Hover Detector

This is a lightweight web application that allows users to upload any image of a human body and **interactively identify body parts** by hovering the mouse over them. It uses **TensorFlow.js** and **MoveNet Thunder** to detect key body points in the image, and dynamically shows a tooltip with the body part name.

## ✨ Features

- 📷 Upload any image with a human
- 🧠 Uses **MoveNet Thunder** for precise pose detection
- 🖱️ Hover over body parts like arms, face, chest, legs, etc. to see a labeled tooltip
- 🎨 Colored keypoints and a side legend for easy reference
- 💡 Inferred body parts like **thighs** and **chest center** using midpoint logic
- 💻 Built entirely using **HTML, CSS, and Vanilla JS**

---

## 📸 Detected & Labeled Body Parts

- **Face** 
- **Left/Right Arm**
- **Left/Right Elbow**
- **Left/Right Hand**
- **Chest Center** (midpoint between shoulders) - Not Proper Always
- **Left/Right Thigh** (midpoint between hips & knees)
- **Left/Right Knee**
- **Left/Right Foot**

---

## 🛠️ Tech Stack

- **HTML5**, **CSS3**
- **JavaScript (Vanilla + Canvas API)**
- **[TensorFlow.js](https://www.tensorflow.org/js)**
- **[MoveNet Thunder Model](https://www.tensorflow.org/js/models/pose_detection)**

---

## 🚀 Getting Started

To run the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/human-body-hover.git
cd human-body-hover
