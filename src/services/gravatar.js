import md5 from 'crypto-js/md5';

const gravatarApi = async (email) => {
  const hashEmail = md5(email).toString();
  const image = await fetch(`https://www.gravatar.com/avatar/${hashEmail}`);
  return image.url;
};

export default gravatarApi;
