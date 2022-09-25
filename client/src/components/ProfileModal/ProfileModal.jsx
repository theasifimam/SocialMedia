import { Modal, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/UploadActions";
import { updateUser } from "../../actions/userAction";

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();

  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();

  const { user } = useSelector((state) => state.authReducer.authData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;

      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }

    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.CoverPicture = fileName;

      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }

    dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  };

  console.log(formData);
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      {/* Modal content */}
      <form className="infoForm">
        <h3>Your Info</h3>

        <div>
          <input
            value={formData.firstname}
            onChange={handleChange}
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First Name"
          />
          <input
            value={formData.lastname}
            onChange={handleChange}
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Last Name"
          />
        </div>

        <div>
          <input
            value={formData.worksAt}
            onChange={handleChange}
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
          />
        </div>
        <div>
          <input
            value={formData.livesin}
            onChange={handleChange}
            type="text"
            className="infoInput"
            name="livesin"
            placeholder="Lives in"
          />
          <input
            value={formData.country}
            onChange={handleChange}
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
          />
        </div>

        <div>
          <input
            value={formData.relationship}
            onChange={handleChange}
            type="text"
            className="infoInput"
            name="relationship"
            placeholder="Relationship Status"
          />
        </div>

        <div>
          Profile Image
          <input type="file" name="profileImage" onChange={onImageChange} />
          Cover Image
          <input type="file" name="coverImage" onChange={onImageChange} />
        </div>

        <button
          className="button infoButton"
          type="submit"
          onClick={handleSubmit}
        >
          Update
        </button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
