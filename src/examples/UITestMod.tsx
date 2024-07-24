import { MR2Globals } from "magic-research-2-modding-sdk";

/**
 * This replaces the ManaBar component
 * with a green Mana bar.
 * It also changes the consumption displayed, from the Perma-Cast consumption,
 * to the one from all the Wizards, as a display of what's possible.
 */
function loadManaBar(MR2: MR2Globals) {
  const UI = MR2.UI;
  const React = UI.React;

  const styles = UI.StyleSheet.create({
    container: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      width: "100%",
      backgroundColor: "#040",
      height: 29,
    },
    gradient: {
      width: "100%",
      position: "absolute",
      left: 0,
      top: 0,
    },
    filled: {
      position: "absolute",
      left: "-100%",
      top: 0,
      height: "100%",
      width: "200%",
      overflow: "hidden",
    },
    textOverlay: {
      color: "#fff",
      fontWeight: "bold",
    },
    income: {
      color: "#fff",
      fontWeight: "normal",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      height: 16,
      width: 16,
      marginRight: 4,
    },
    accessibilityHidden: {
      width: 1,
      height: 1,
      position: "absolute",
      left: 0,
      top: 0,
    },
  });

  // This is unused but you could use it inside ManaBarReplacement
  // if desired
  const _ManaBar = UI.overwritableUIComponents.ManaBar;
  function ManaBarReplacement(props) {
    const { useRef, useEffect, useMemo } = React;
    const {
      useAuxOptions,
      useGameState,
      useSafeAreaInsets,
      Animated,
      Easing,
      LinearGradient,
      Text,
      View,
      GameIcon,
      Platform,
    } = UI;
    const {
      getResourceAmount,
      getResourceCap,
      Resource,
      calculateIncomePerSecond,
      estimateManaConsumptionPerSecPerStrategy,
      getCurrentAutocastStrategy,
      formatNumber,
    } = MR2;
    const auxOptions = useAuxOptions();
    const state = useGameState();
    const mana = getResourceAmount(state, Resource.Mana);
    const manaCap = getResourceCap(state, Resource.Mana);
    const insets = useSafeAreaInsets();
    const ratioFilled = Math.min(1.0, mana / manaCap);

    const filledAnimWithNativeDriver = useRef(
      new Animated.Value(ratioFilled),
    ).current;
    const filledAnimWithoutNativeDriver = useRef(
      new Animated.Value(ratioFilled),
    ).current;

    const manaIncome = calculateIncomePerSecond(state)?.Mana ?? 0;
    // This is changed from the original game
    const permaCastCost = estimateManaConsumptionPerSecPerStrategy(
      state,
      getCurrentAutocastStrategy(state),
    );

    const incomeText =
      manaIncome != 0
        ? " (" +
          (manaIncome > 0 ? "+" : "") +
          formatNumber(manaIncome, { showDecimals: true }) +
          "/s" +
          (permaCastCost != 0
            ? "; -" + formatNumber(permaCastCost, { showDecimals: true }) + "/s"
            : "") +
          ")"
        : "";

    useEffect(() => {
      if (state.options.doNotUseNativeDriver) {
        Animated.timing(filledAnimWithoutNativeDriver, {
          toValue: Math.max(ratioFilled, 1e-5),
          easing: Easing.out(Easing.quad),
          duration: 100,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.timing(filledAnimWithNativeDriver, {
          toValue: Math.max(ratioFilled, 1e-5),
          easing: Easing.out(Easing.quad),
          duration: 100,
          useNativeDriver: true,
        }).start();
      }
    }, [ratioFilled]);
    const animatedStyle = useMemo(
      () => [
        styles.filled,
        {
          transform: [
            {
              scaleX: state.options.doNotUseNativeDriver
                ? filledAnimWithoutNativeDriver
                : filledAnimWithNativeDriver,
            },
          ],
        },
      ],
      [state.options.doNotUseNativeDriver],
    );
    const animatedComponent = useMemo(
      () => (
        <Animated.View
          key={state.options.doNotUseNativeDriver ? "yes" : "no"}
          style={[
            animatedStyle,
            insets.bottom < 10 && { backgroundColor: "#0a2" },
          ]}
        >
          {insets.bottom >= 10 && (
            <LinearGradient
              colors={[`#0a2`, `#0a20`]}
              style={[
                styles.gradient,
                {
                  height: Math.max(
                    48,
                    (auxOptions.compactLayout ? 21 : 29) + insets.bottom,
                  ),
                },
              ]}
            />
          )}
        </Animated.View>
      ),
      [
        state.options.doNotUseNativeDriver,
        animatedStyle,
        insets.bottom,
        auxOptions.compactLayout,
      ],
    );
    const incomeTextComponent = useMemo(
      () => <Text style={styles.income}>{incomeText}</Text>,
      [incomeText],
    );
    const manaTextComponent = useMemo(
      () => (
        <Text style={styles.textOverlay}>
          {formatNumber(mana)}/{formatNumber(manaCap)}
          {incomeTextComponent}
        </Text>
      ),
      [mana, manaCap, incomeTextComponent],
    );
    const accessibilityLabel = useMemo(
      () =>
        `Mana: ${formatNumber(mana)}/${formatNumber(manaCap)} ${incomeText}`,
      [mana, manaCap, incomeText],
    );
    return useMemo(
      () => (
        <View
          style={[
            styles.container,
            { height: (auxOptions.compactLayout ? 21 : 29) + insets.bottom },
          ]}
        >
          {animatedComponent}
          <View>
            <View
              style={styles.row}
              accessible={true}
              accessibilityRole={Platform.OS !== "web" ? "header" : undefined}
              accessibilityLabel={accessibilityLabel}
            >
              <GameIcon icon="mana" style={styles.icon} />
              {manaTextComponent}
            </View>
            <View style={{ height: insets.bottom }} />
          </View>
        </View>
      ),
      [
        animatedComponent,
        accessibilityLabel,
        manaTextComponent,
        insets.bottom,
        auxOptions.compactLayout,
      ],
    );
  }

  UI.overwritableUIComponents.ManaBar = ManaBarReplacement;
}

/**
 * This creates a new "Community" section with some dummy behavior
 * and UI.
 */
function loadCommunity(MR2: MR2Globals) {
  const UI = MR2.UI;
  const React = UI.React;

  function Community(props: {}) {
    const [state, stateRef] = UI.useGameStateWithRef();
    const currentCoins = MR2.getResourceAmount(state, MR2.Resource.Coins);
    const doubleCoins = React.useCallback(
      () =>
        stateRef.current.apply((state) => {
          return MR2.grantResource(
            MR2.Resource.Coins,
            MR2.getResourceAmount(state, MR2.Resource.Coins),
          )(state);
        }),
      [],
    );
    const markdownContents = `This is a **mod test screen**. Let's coerce the community of Wizards into giving us more :coins:. You currently have ${MR2.formatNumber(
      currentCoins,
    )}:coins:. Try changing the current color theme in options, too.`;
    const theme = UI.useTheme();
    const markdownComponent = React.useMemo(
      () => (
        <UI.Markdown
          style={{
            height: 200,
            opacity: 0.5,
            backgroundColor: theme.colors.secondary,
            color: theme.colors.onSecondary,
          }}
        >
          {markdownContents}
        </UI.Markdown>
      ),
      [currentCoins, theme],
    );
    return React.useMemo(
      () => (
        <UI.View>
          {markdownComponent}
          <UI.Button onPress={doubleCoins}>Double Coins</UI.Button>
        </UI.View>
      ),
      [markdownComponent, doubleCoins],
    );
  }

  MR2.registerGameIcon("community", require("./community.png"));

  UI.registerCustomSection(
    {
      id: "Community",
      name: "Community",
      keepInMemory: true,
      scrollable: true,
      scrollView: true,
      hideBottomResourceBar: false,
      Component: Community,
      hotkey: "M",
      isVisible: (state) => MR2.hasFlag(state, "TransmutationUnlocked"),
    },
    "Exploration",
  );
}

export function loadUITestMod(MR2: MR2Globals) {
  loadManaBar(MR2);
  loadCommunity(MR2);

  MR2.registerStringOverride("Transmute", "Craft");
}
