import { Component } from '@angular/core';
import { SocketPedidoService } from './services/socket/socket-pedido.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'buen-sabor-cliente-front';
  constructor(public socketPedidosService: SocketPedidoService, private messageService: MessageService) {}
  ngOnInit(){
    this.socketPedidosService.sendLoginEvent();
    this.socketPedidosService.escucharUpdatePedido().subscribe(( ev)=>{
      console.log(ev);
      this.messageService.add({severity:'info', summary:'nuevo pedido', detail: `El pedido ${ev.data.pedido} ha cambiado a estado ${ev.data.nuevoEstado}`});
    })
  }
}
