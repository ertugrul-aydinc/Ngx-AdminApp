import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of, throwError } from "rxjs";
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from "../ui/custom-toastr.service";
import { UserAuthService } from "./models/user-auth.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {
  constructor(
    private toastrService: CustomToastrService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Hata işleme kodları buraya gelecek

        switch(error.status){

          case HttpStatusCode.Unauthorized:
            this.toastrService.message("Bu işlemi yapmaya yetkiniz yoktur","Yetkisiz İşlem !",{
              messageType:ToastrMessageType.Warning,
              position:ToastrPosition.TopRight
            });
            break;

            case HttpStatusCode.InternalServerError:
              this.toastrService.message("Sunucuya erişilemiyor","Sunucu Hatası !",{
                messageType:ToastrMessageType.Warning,
                position:ToastrPosition.TopRight
              })
              break;

              case HttpStatusCode.BadRequest:
                this.toastrService.message("Geçersiz istek yapıldı !","Geçersiz İstek !",{
                  messageType:ToastrMessageType.Warning,
                  position:ToastrPosition.TopRight
                })
                break;
      
              case HttpStatusCode.NotFound:
                this.toastrService.message("Sayfa bulunamadı !","Sayfa Bulunamadı !",{
                  messageType:ToastrMessageType.Warning,
                  position:ToastrPosition.TopRight
                })
                break;
              
              default:
                this.toastrService.message("Beklenmeyen bir hata meydana gelmiştir !","Hata !",{
                  messageType:ToastrMessageType.Warning,
                  position:ToastrPosition.TopRight
                })
                break;
        }
        return throwError(error);
      })
    );
  }
}
