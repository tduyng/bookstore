import React, { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { IUser } from 'src/app/features/user/user.types';
import { AppState } from 'src/store/reducers';
import { requestWithAuth } from 'src/utils/request';
import { useAppDispatch } from 'src/store';
import { fetchUser } from 'src/app/features/user/user.actions';

export const Account = () => {
  const { user, isLoggedIn } = useSelector((state: AppState) => state.user);
  const { username, email, thumbnail } = user as IUser;
  const [file, setFile] = useState('');
  const [nameFile, setNameFile] = useState('');
  const [scale, setScale] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dispatch = useAppDispatch();

  const ref: any = useRef();

  const handleScale = (e: any) => {
    setScale(parseFloat(e.target.value));
  };

  const onChange = (e: any) => {
    setFile(e.target.files[0]);
    setNameFile(e.target.files[0].name);
    setError('');
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (ref.current) {
      setError('');
      ref.current.getImageScaledToCanvas().toBlob(async (blob: any) => {
        try {
          const scaledFile = new File([blob], nameFile);
          const formData = new FormData();
          formData.append('file', scaledFile);
          const res = await requestWithAuth('/api/upload', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          await dispatch(fetchUser());
          setSuccess(res.data);
        } catch (err) {
          setError(err.response.data);
        }
      });
    } else {
      setSuccess('');
      setError('Please choose file');
    }
  };

  return (
    <div className="account">
      {(!user || !isLoggedIn) && <Redirect to="/" />}
      <h1 className="account__title">My account</h1>
      <div className="account__profile">
        <p className="account__profile--username">Username: {username}</p>
        <p className="account__profile--email">Email: {email}</p>
        <p>Thumbnail: {!thumbnail && "image doesn't exist"}</p>
        {thumbnail && (
          <img className="account__profile--thumbnail" alt="thumbnail" src={thumbnail} />
        )}
        {file && (
          <>
            <br />
            <AvatarEditor
              ref={ref}
              image={file}
              width={200}
              height={200}
              border={15}
              borderRadius={100}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={scale}
              rotate={0}
            />
            <br />
            Zoom:
            <input
              type="range"
              onChange={handleScale}
              min="1"
              max="1.8"
              step="0.01"
              defaultValue="1"
            />
          </>
        )}

        <form onSubmit={onSubmit}>
          <input type="file" id="file" name="file" accept="image/*" onChange={onChange} />
          <button type="submit" className="auth__form--button">
            Upload
          </button>
        </form>
        {success && <p className="account__profile--success">{success}</p>}
        {error && <p className="account__profile--error">{error}</p>}
      </div>
    </div>
  );
};
