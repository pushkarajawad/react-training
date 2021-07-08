import axios from "axios";
import { Transaction } from "./Models/Movie";

export const baseUrl = "http://192.168.0.20:7600";
export class ServiceManager {
  private static instance: ServiceManager;
  private constructor() {
  }
  public static getInstance(): ServiceManager {
    if (!ServiceManager.instance) {
      ServiceManager.instance = new ServiceManager();
    }

    return ServiceManager.instance;
  }

  public getSliderMovies(){
    return axios.get(`${baseUrl}/movies?_limit=4`);
  }

  public getLatestMovies(){
    return axios.get(`${baseUrl}/movies?_start=1&_end=4`);
  }

  public getUpcomingMovies(){
    return axios.get(`${baseUrl}/movies?_start=5&_end=7`);
  }

  public getMovieById(id:string){
    return axios.get(`${baseUrl}/movies?id=${id}`);
  }
  public BookMovie(transaction: Transaction) {
    return axios.post(`${baseUrl}/transactions`, transaction);
  }
}
