import React, { useEffect, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useSelector } from 'react-redux';
import { AppState } from 'src/store/reducers';
import { requestWithAuthSimple } from 'src/utils/request';
import { useAppDispatch } from 'src/store';
import { fetchUser } from 'src/app/features/user/user.actions';
import { SERVER_LINKS } from 'src/app/constants/links.constant';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';

export const Account = () => {
  const { user, isLoggedIn } = useSelector((state: AppState) => state.user);
  const history = useHistory();

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

  useEffect(() => {
    if (!user || !isLoggedIn) {
      history.push('/');
    }
  }, [user, isLoggedIn]);

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (ref.current) {
      setError('');
      ref.current.getImageScaledToCanvas().toBlob(async (blob: any) => {
        try {
          const scaledFile = new File([blob], nameFile);
          const formData = new FormData();
          formData.append('file', scaledFile);
          const res = await requestWithAuthSimple(SERVER_LINKS.userUpload, {
            method: 'POST',
            body: formData,
          });
          await dispatch(fetchUser());
          setSuccess(res.data);
          toast.success('Upload new avatar successfully');
        } catch (err) {
          setError(err.response.data);
          toast.error(err.response.data);
        }
      });
    } else {
      setSuccess('');
      setError('Please choose file');
    }
  };

  return (
    <div className="account">
      <h1 className="account__title">My account</h1>
      <div className="account__profile">
        <p className="account__profile--username">Username: {user?.username}</p>
        <p className="account__profile--email">Email: {user?.email}</p>
        <p>Thumbnail: {!user?.thumbnail && "image doesn't exist"}</p>
        {user?.thumbnail && (
          <img
            className="account__profile--thumbnail"
            alt="thumbnail"
            src={user?.thumbnail}
          />
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
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            onChange={onChange}
            style={{ display: 'block', marginTop: '2rem' }}
          />
          <button
            type="submit"
            className="book__content--button"
            style={{ marginTop: '2rem' }}
          >
            Upload
          </button>
        </form>
        {success && <p className="account__profile--success">{success}</p>}
        {error && <p className="account__profile--error">{error}</p>}
      </div>
    </div>
  );
};
