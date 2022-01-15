import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModelServer, serverResponse } from '../models/product.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private url = environment.SERVER_URL;

  constructor(private http: HttpClient) {}
  // lấy 4 loại sản phẩm đầu trong database
  getAllProducts(limitOfResults = 8): Observable<serverResponse> {
    return this.http
      .get<serverResponse>(this.url + 'products', {
        params: {
          limit: limitOfResults.toString(),
        },
      })
      .pipe();
  }

  //lấy 1 sản phẩm từ database: dùng trong giỏ hàng
  getSingleProduct(masp: number): Observable<ProductModelServer> {
    return this.http.get<ProductModelServer>(this.url + 'products/' + masp);
  }

  // lấy sản phẩm dây chuyền trong database
  getProductsDaychuyen(limitOfResults = 8): Observable<serverResponse> {
    return this.http
      .get<serverResponse>(this.url + 'products/loaisp/Dây chuyền', {
        params: {
          limit: limitOfResults.toString(),
        },
      })
      .pipe();
  }

  // lấy sản phẩm bông tai trong database
  getProductsBongtai(limitOfResults = 8): Observable<serverResponse> {
    return this.http
      .get<serverResponse>(this.url + 'products/loaisp/Bông tai', {
        params: {
          limit: limitOfResults.toString(),
        },
      })
      .pipe();
  }

  // lấy sản phẩm vòng tay trong database
  getProductsVongtay(limitOfResults = 8): Observable<serverResponse> {
    return this.http
      .get<serverResponse>(this.url + 'products/loaisp/Vòng tay', {
        params: {
          limit: limitOfResults.toString(),
        },
      })
      .pipe();
  }

  // lấy sản phẩm thiên nhiên trong database
  getProductsThiennhien(limitOfResults = 8): Observable<serverResponse> {
    return this.http
      .get<serverResponse>(this.url + 'products/loaisp/Thiên nhiên', {
        params: {
          limit: limitOfResults.toString(),
        },
      })
      .pipe();
  }

  // lấy sản phẩm Cài tóc trong database
  getProductsCaitoc(limitOfResults = 8): Observable<serverResponse> {
    return this.http
      .get<serverResponse>(this.url + 'products/loaisp/Cài tóc', {
        params: {
          limit: limitOfResults.toString(),
        },
      })
      .pipe();
  }

  // lấy sản phẩm vũ trụ trong database
  getProductsVutru(limitOfResults = 8): Observable<serverResponse> {
    return this.http
      .get<serverResponse>(this.url + 'products/loaisp/Vũ trụ', {
        params: {
          limit: limitOfResults.toString(),
        },
      })
      .pipe();
  }
  // lấy sản phẩm thanh lịch trong database
  getProductsThanhlich(limitOfResults = 8): Observable<serverResponse> {
    return this.http
      .get<serverResponse>(this.url + 'products/loaisp/Thanh lịch', {
        params: {
          limit: limitOfResults.toString(),
        },
      })
      .pipe();
  }

  // lấy tất cả sản phẩm ở trang sản phẩm
  getAllInPageProducts(): Observable<serverResponse> {
    return this.http.get<serverResponse>(this.url + 'products');
  }

  getAllTypeOfProducts(): Observable<serverResponse> {
    return this.http.get<serverResponse>(this.url + 'productOfType');
  }

  //lấy sản phẩm theo Mã loại sản phẩm:menu
  getProductsFromType(tenlsp: any): Observable<serverResponse> {
    return this.http.get<serverResponse>(
      this.url + 'products/loaisp/' + tenlsp
    );
  }
}
