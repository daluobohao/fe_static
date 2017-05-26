export const location = {
  getParams() {
    return window.location.search.slice(1).split('&').map((item) => {
      const str = item.split('=');
      return {
        key: str[0],
        value: str[1],
      };
    });
  },
  getParam(key) {
    const objs = this.getParams();

    for (let i = 0; i < objs.length; i++) {
      const obj = objs[i];
      if (obj.key === key) {
        return obj;
      }
    }
    return null;
  },
};

export const formatParams = (params) => {
  const temp = [];
  for (name in params) {
    const value = params[name];
    temp.push(`${name}=${value}`);
  }
  return temp.join('&');
};

export const formatDateString = (long) => {
  const date = long ? new Date(long) : new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}月${day}日`;
};

export const formatTimeString = (long) => {
  const date = long ? new Date(long) : new Date();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  const complete = (number) => {
    if (number < 10) {
      return `0${number}`;
    }
    return number;
  };
  return `${complete(h)}:${complete(m)}:${complete(s)}`;
};
