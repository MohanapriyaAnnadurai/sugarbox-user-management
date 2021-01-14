export class EnvService {
  // The values that are defined here are the default values that can
  // be overridden by env.js
  // API url
  public apiUrl = 'http://localhost:8003';
  public version = '';
  public folderPath='';

  // Whether or not to enable debug mode
  public enableDebug = false;

  constructor() {
  }

}
