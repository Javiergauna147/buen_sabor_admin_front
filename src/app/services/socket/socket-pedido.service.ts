import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class SocketPedidoService {
    constructor(private socket:Socket, private authService: AuthService) {}
    
    private eventObservable: Observable<{
        type: string;
        data: {
            user_cliente: string;
            pedido: string;
            nuevoEstado: string;
        };
    }> | null = null;
    private isLogged:boolean = false;
    
    sendLoginEvent(){
        if(!this.isLogged){
            let user = this.authService.obtenerUsuario();
            this.socket.emit('join',{
                "type":"join_back",
                "data":{
                    "user":user
                }
            })
            this.socket.fromEvent('disconnect').subscribe(()=>this.isLogged=false);
            this.isLogged = true;
        }
    }

    escucharUpdatePedido(){
        if(this.authService.obtenerUsuario() != undefined && this.authService.obtenerUsuario()!= null && this.authService.obtenerUsuario() !="")
            this.sendLoginEvent();
        if(this.eventObservable)
            return this.eventObservable;
        else{
            this.eventObservable = this.socket.fromEvent<{
                type: string,
                data: {
                    user_cliente: string,
                    pedido: string,
                    nuevoEstado: string
                }
            }>('pedido_update');
            return this.eventObservable;
        }
    }

    public sendEventUpdatePedido(pedido:string, nuevoEstado:string, user:string){
        this.socket.emit('pedido',{
            "type": "pedido_update",
            "data": {
                "user_cliente": user,
                "pedido": pedido,
                "nuevoEstado": nuevoEstado
            }
        })
    }
}