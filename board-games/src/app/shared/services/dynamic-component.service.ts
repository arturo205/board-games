import { Injectable, ComponentFactoryResolver, ViewContainerRef, Inject } from '@angular/core';
import { DynamicComponents } from 'app/shared/DynamicComponents';
import { CfSquareComponent } from 'app/components/connect-four/cf-board/cf-square/cf-square.component';

@Injectable()
export class DynamicComponentService {

  private factoryResolver: ComponentFactoryResolver;
  private rootViewContainer: ViewContainerRef;

  constructor(@Inject(ComponentFactoryResolver) factoryResolver) {
    this.factoryResolver = factoryResolver;
  }

  public setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  public addDynamicComponent(componentType: DynamicComponents) {

    console.log("Arturo 1");
    let factory;

    switch (componentType) {
      case DynamicComponents.ConnectFourSquare:
        factory = this.factoryResolver.resolveComponentFactory(CfSquareComponent);
      break;
      default: break;
    }

    console.log("Arturo 2");
    console.log(this.rootViewContainer);
    const component = factory.create(this.rootViewContainer.parentInjector);
    console.log("Arturo 3");
    console.log(component);
    this.rootViewContainer.insert(component.hostView);
    
    return component.instance;
  }
}
