import { Component, OnInit } from '@angular/core';
import {IPayPalConfig, ICreateOrderRequest, ITransactionItem} from 'ngx-paypal';
import {CartService} from "../services/cart.service";
import {Product} from "../search/product.model";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{

  public payPalConfig ? : IPayPalConfig;
  public showCancel = false;
  public showError = false;
  public showSuccess = false;
  /*public products = [{name: "iphone", description: "iphone 7 plus", price: 5000.00, image:"https://obiwezy.com/media/catalog/product/cache/ce2df2e05314a5bf3f97292d3ff57525/i/p/iphone_7plus_gold_4.jpg"},
{name:"adidog shirt", description:"very cute!!", price: 30, image:"https://k9cafesa.com/images/adidog-pink-t-shirt-for-dogs-and-cats-big/10603/800x800/004121.jpg"}]*/
  products :any = [];
  public total = 0;

  constructor(private cartService:CartService) { }

  private items: ITransactionItem[] = this.products.map(((curr: { name: any; price: { toString: () => any; }; }) => {
    let newo: ITransactionItem = {name:curr.name,
            unit_amount:{currency_code:"ILS", value:curr.price.toString()},
             quantity:"1"}
             return newo;
  }));

    ngOnInit(): void {
        this.initConfig();
    }

    private initConfig(): void {
      this.products = this.cartService.products;
      this.total = this.products.reduce((sum: any, current: { price: any; }) =>
        sum + current.price, 0
      )
        this.payPalConfig = {
            currency: 'ILS',
            clientId: 'sb',
            createOrderOnClient: (data) => < ICreateOrderRequest > {
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: 'ILS',
                        value: this.total.toString(),
                        breakdown: {
                            item_total: {
                                currency_code: 'ILS',
                                value: this.total.toString()
                            }
                        }
                    },
                    items: this.items
                }]
            },
            advanced: {
                commit: 'true'
            },
            style: {
                label: 'paypal',
                layout: 'vertical'
            },
            onApprove: (data, actions) => {
                console.log('onApprove - transaction was approved, but not authorized', data, actions);
                actions.order.get().then((details: any) => {
                    console.log('onApprove - you can get full order details inside onApprove: ', details);
                });

            },
            onClientAuthorization: (data) => {
                console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
                this.showSuccess = true;
            },
            onCancel: (data, actions) => {
                console.log('OnCancel', data, actions);
                this.showCancel = true;

            },
            onError: err => {
                console.log('OnError', err);
                this.showError = true;
            },
            onClick: (data, actions) => {
                console.log('onClick', data, actions);
                //this.resetStatus();
            }
        };
    }
}
