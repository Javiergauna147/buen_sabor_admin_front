import { Component } from '@angular/core';
import { SocketPedidoService } from './services/socket/socket-pedido.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'buen-sabor-cliente-front';
  constructor(public socketPedidosService: SocketPedidoService, private messageService: MessageService, private router:Router, private authService:AuthService ) {}
  ngOnInit(){
    if(this.authService.obtenerToken() === null){
      this.router.navigate(['/login']);
    }
    this.socketPedidosService.sendLoginEvent();
    let observable = this.socketPedidosService.escucharUpdatePedido();
    observable.subscribe(( ev)=>{
      console.log(ev);
      this.messageService.add({severity:'info', summary:'nuevo pedido', detail: `El pedido ${ev.data.pedido} ha cambiado a estado ${ev.data.nuevoEstado}`});
    })
  }
}
