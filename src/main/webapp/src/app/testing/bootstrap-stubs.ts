import {Injectable} from '@angular/core';

class ModalRef {
  text: string;
}

class Result { 
  then(onfulfilled?: ((value: any) => any | PromiseLike<any>)): Promise<any> {
    // TODO: I don't know how to return value to call a callback function
    return Promise.resolve(onfulfilled);
  }
}

@Injectable()
export class NgbModalStub {
  componentInstance: ModalRef;
  result: Result;

  open(): NgbModalStub {
    this.componentInstance = new ModalRef();
    this.result = new Result();
    return this;    
  }
}
