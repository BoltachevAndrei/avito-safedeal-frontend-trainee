const REMOTE_HOST = `https://boiling-refuge-66454.herokuapp.com`;

const Code = {
  OK: 200,
  MULTIPLE_CHOICE: 300
};

const Method = {
  GET: `GET`,
  POST: `POST`
};

const checkResponseStatus = (response) => {
  if (response.status >= Code.OK && response.status <= Code.MULTIPLE_CHOICE) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Api {
  constructor(remoteHost = REMOTE_HOST) {
    this._remoteHost = remoteHost;
  }

  getImages() {
    return this._load({url: `images`})
      .then((response) => response.json());
  }

  getImage(id) {
    return this._load({url: `images/${id}`})
      .then((response) => response.json());
  }

  sendComment(id, comment) {
    return this._load({
      url: `images/${id}/comments`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': `application/json`})
    });
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorizationKey);

    return fetch(`${this._remoteHost}/${url}`, {method, body, headers})
      .then(checkResponseStatus)
      .catch((err) => {
        throw err;
      });
  }
}
