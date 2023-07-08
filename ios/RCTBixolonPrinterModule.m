//
//  RCTBixolonPrinterModule.m
//  SkyPOS
//
//  Created by Thịnh Nguyễn on 02/07/2023.
//


#import "RCTBixolonPrinterModule.h"
#import <React/RCTLog.h>


@implementation RCTBixolonPrinterModule


RCT_EXPORT_METHOD(helloPrinter:(NSString *)msg)
{
  RCTLogInfo(@"ThinhLog Hello printer::: %@", msg);
}

RCT_EXPORT_METHOD(connectToPrinter: (NSString *) ip resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  if(printerCon == nil) {
    [self initPOS];
  }
  
  UPOSPrinter* target = [UPOSPrinter new];
  target.address = ip;
  target.port = @"9100";
  __UPOS_RESULT_CODE openResult = -1;
  openResult = [printerCon open:target.modelName address:target.address];
  if( openResult == UPOS_SUCCESS) {
    if([printerCon claim:5000] == UPOS_SUCCESS){
      [NSThread sleepForTimeInterval:0.1f];
      [printerCon setDeviceEnabled:YES];
      resolve(@(YES));
      
    } else {
      reject(@"claim_fail", @"Can't claim to printer", nil );
    }
  } else {
    reject(@"connect_fail", @"Can't connect to printer", nil );
  }
}

RCT_EXPORT_METHOD(disconnectPrinter)
{
  printerCon.DeviceEnabled = NO;
  if([printerCon releaseDevice] == UPOS_SUCCESS){
    [NSThread sleepForTimeInterval:0.01f];
    [printerCon close];
  }
}



RCT_EXPORT_METHOD(printText:(NSString *)text)
{
  [self printNormalText:text];
}

RCT_EXPORT_METHOD(printTitle:(NSString *)text)
{
  [printerCon printNormal:PTR_S_RECEIPT data:[NSString stringWithFormat:@"\x1B|4C|cA%@\r\n", text]];
}

RCT_EXPORT_METHOD(printBoldText:(NSString *)text)
{
  [printerCon printNormal:PTR_S_RECEIPT data:[NSString stringWithFormat:@"\x1B|bC%@\r\n", text]];
}

RCT_EXPORT_METHOD(cutPage) {
  [printerCon cutPaper:100];
}


-(void) initPOS {
  printerCon = [[UPOSPrinterController alloc]init];
  [printerCon setLogLevel: LOG_SHOW_NEVER ];
  printerCon.delegate = self;
  [printerCon setTextEncoding:NSUTF8StringEncoding];
  [printerCon setCharacterSet:54937];
}

-(void) printNormalText:(NSString *) text {
  [printerCon printNormal:PTR_S_RECEIPT data:[NSString stringWithFormat:@"\x1B|1C%@\r\n", text]];
}
// To export a module named RCTBixolonPrinterModule
RCT_EXPORT_MODULE(BixolonPrinterModule);

@end
