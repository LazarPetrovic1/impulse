const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const cloudinary = require('../../utils/cloudinary')

async function getUser(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function login(req, res) {
  const { email, password, phone, username } = req.body;
  let user;

  try {
    if (email) {
      user = await User.findOne({ email });
    } else if (phone) {
      user = await User.findOne({ phone });
    } else {
      user = await User.findOne({ username });
    }

    if (!user) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Invalid credentials." }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Invalid credentials." }] });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 3600000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
}

async function updateFirstName(req, res) {
  const { firstName } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { firstName }
    );
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
}

async function updateLastName(req, res) {
  const { lastName } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { lastName }
    );
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
}

async function updateSex(req, res) {
  const { sex } = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: req.user.id }, { sex });
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
}

async function updateEmail(req, res) {
  const { email } = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: req.user.id }, { email });
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
}

async function updateUsername(req, res) {
  const { username } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { username }
    );
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
}

async function updateDateOfBirth(req, res) {
  const { dob } = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: req.user.id }, { dob });
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
}

async function updateCity(req, res) {
  const { city } = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: req.user.id }, { city });
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
}

async function updateCountry(req, res) {
  const { country } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { country }
    );
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
}

async function updateZip(req, res) {
  const { zip } = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: req.user.id }, { zip });
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
}

async function updateSecurity(req, res) {
  const { security } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { security }
    );
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
}

async function updatePhone(req, res) {
  const { phone } = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: req.user.id }, { phone });
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
}

async function updateQuestion(req, res) {
  const { question } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { question }
    );
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
}

async function updateBio(req, res) {
  const { bio } = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: req.user.id }, { bio });
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
}

async function updateProfileImage(req, res) {
  try {
    const fileStr = await req.body.data
    const uploadResponse = await cloudinary.uploader.upload(fileStr)
    let user = await User.findById(req.user.id)
    user.profileImages.push({ url: uploadResponse.url, content: req.body.content })
    await user.save()
    res.json(user)
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
}

async function getCountry(req, res) {
  try {
    const user = await User.findById(req.user.id)
    const users = await User.find({ country: user.country }).select("-imageTaken -password -security -question")
    return res.json(users)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Internal server error')
  }
}

const auth = {
  getUser,
  login,
  updateFirstName,
  updateLastName,
  updateSex,
  updateEmail,
  updateUsername,
  updateDateOfBirth,
  updateCity,
  updateCountry,
  updateZip,
  updateSecurity,
  updatePhone,
  updateQuestion,
  updateBio,
  updateProfileImage,
  getCountry,
};

module.exports = auth;
