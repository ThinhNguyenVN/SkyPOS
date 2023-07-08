//
//  RCTBixolonPrinterModule.h
//  SkyPOS
//
//  Created by Thịnh Nguyễn on 02/07/2023.
//
#import <React/RCTBridgeModule.h>
#import "UPOSPrinterController.h"


@interface RCTBixolonPrinterModule : NSObject <RCTBridgeModule, UPOSDeviceControlDelegate> {
  UPOSPrinterController *printerCon;
}


@end

